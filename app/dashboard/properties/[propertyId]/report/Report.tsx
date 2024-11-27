'use client';

import { Logo } from '@/components/App/Logo';
import { Page, PDFViewer, Document, View, Text, Image } from '@react-pdf/renderer';
import { EventDataType, HouseDataType, PropertyDataType } from 'kotilogi-app/dataAccess/types';
import { createContextWithHook } from 'kotilogi-app/utils/createContextWithHook';
import React from 'react';

type ReportProviderProps = {
  content: {
    property: PropertyDataType;
    ownerCount: number;
    events: EventDataType[];
    heatingSystem: string;
    propertyType: string;
    mainImageId: string;
    buildingMaterial: string;
    roofMaterial: string;
    roofType: string;
  };
};

export const [ReportContext, useReportContext] =
  createContextWithHook<ReportProviderProps>('ReportContext');

export function ReportProvider({
  children,
  ...props
}: ReportProviderProps & React.PropsWithChildren) {
  return <ReportContext.Provider value={props}>{children}</ReportContext.Provider>;
}

const AttributeField = ({ label, value }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        fontSize: '10px',
      }}>
      <Text style={{ color: 'gray' }}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const AttributeGroup = ({ children }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', width: '70%', gap: '8px' }}>
      {children}
    </View>
  );
};

export function Report() {
  const { content } = useReportContext();
  console.log(content.events);
  const pr = content.property as any;

  return (
    <PDFViewer
      width={'100%'}
      height={'100%'}>
      <Document
        title={`${content.property.streetAddress} Raportti`}
        pageLayout='oneColumn'
        pageMode='fullScreen'>
        <Page
          style={{
            paddingTop: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '100%',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              src='/logo_black.png'
              style={{
                aspectRatio: '16/9',
                height: '24px',
              }}
            />
          </View>
          <Text style={{ color: 'gray', fontSize: '10px' }}>HUOLTORAPORTTI</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              marginBottom: '24px',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                gap: '24px',
                flexDirection: 'column',
                fontSize: '12px',
                width: '80%',
              }}>
              <View style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <View style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <Text style={{ fontSize: '16px' }}>
                    {(content.propertyType === 'Huoneisto' &&
                      content.property.streetAddress + pr.appartmentNumber) ||
                      (content.property as HouseDataType).propertyNumber}
                  </Text>
                  <Text>{content.property.zipCode}</Text>
                </View>

                <View
                  style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <Text style={{ marginBottom: '24px' }}>
                    {content.property.description || 'Ei kuvausta.'}
                  </Text>
                  <AttributeGroup>
                    <AttributeField
                      label='Rakennusvuosi'
                      value={content.property.buildYear || 'Ei määritelty'}
                    />

                    <AttributeField
                      label='Tyyppi'
                      value={content.propertyType || 'Ei määritelty'}
                    />

                    <AttributeField
                      label='Rakennusmateriaali'
                      value={content.buildingMaterial || 'Ei määritelty'}
                    />
                    <AttributeField
                      label='Katon materiaali'
                      value={content.roofMaterial || 'Ei määritelty'}
                    />
                    <AttributeField
                      label='Katon tyyppi'
                      value={content.roofType || 'Ei määritelty'}
                    />
                    <AttributeField
                      label='Lämmitysmuoto'
                      value={content.heatingSystem || 'Ei määritelty'}
                    />

                    <AttributeField
                      label='Asuintilojen pinta-ala'
                      value={
                        <>
                          {pr.livingArea}
                          <Text style={{ fontSize: '8px' }}>m2</Text>
                        </>
                      }
                    />

                    <AttributeField
                      label='Muu pinta-ala'
                      value={
                        <>
                          {pr.otherArea}
                          <Text style={{ fontSize: '8px' }}>m2</Text>
                        </>
                      }
                    />

                    <AttributeField
                      label='Kokonaispinta-ala'
                      value={
                        <>
                          {pr.otherArea + pr.livingArea}
                          <Text style={{ fontSize: '8px' }}>m2</Text>
                        </>
                      }
                    />
                    <AttributeField
                      label='Huoneiden lukumäärä'
                      value={content.property.roomCount}
                    />

                    {(content.propertyType === 'Kiinteistö' && (
                      <AttributeField
                        label='Kerrosten lukumäärä'
                        value={content.property.floorCount}
                      />
                    )) || (
                      <AttributeField
                        label='Kerros'
                        value={pr.floorNumber}
                      />
                    )}
                  </AttributeGroup>
                </View>
              </View>
            </View>
            <Image
              src={`/api/protected/files/${content.mainImageId}`}
              style={{
                borderRadius: '100%',
                width: '100px',
                height: '100px',
                flexShrink: 0,
              }}
            />
          </View>
          <View style={{ borderWidth: '1px', borderBottom: 'gray', opacity: 0.1, width: '100%' }} />
          <View style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '10px' }}>
            {content.events.map(e => {
              console.log(e.labourExpenses);
              return (
                <React.Fragment key={JSON.stringify(e)}>
                  <View
                    style={{
                      fontSize: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <Text style={{ fontWeight: 700 }}>{e.title}</Text>
                      <Text style={{ fontSize: '10px' }}>{e.date.toLocaleDateString('fi')}</Text>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        fontWeight: 400,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          fontSize: '10px',
                        }}>
                        <Text style={{ color: 'gray', fontSize: '10px', fontWeight: 600 }}>
                          Lisätiedot
                        </Text>
                        <Text>{e.description || 'Ei kuvausta.'}</Text>
                      </View>

                      <View>
                        <Text style={{ fontSize: '12px' }}>
                          {(e.materialExpenses + e.labourExpenses).toLocaleString('fi')}€
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottom: '1px dashed gray',
                      opacity: 0.1,
                    }}
                  />
                </React.Fragment>
              );
            })}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
