import { BoxHeader } from '@/components/New/Boxes/BoxHeader';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { PreviewContentBase, PreviewContentRow } from '@/components/New/Boxes/PreviewContent';
import { IconLink } from '@/components/New/Links/IconLink';
import { Main } from '@/components/New/Main';
import { MainHeading } from '@/components/New/Typography/Headings';
import { Card } from '@/components/UI/Card';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { Bolt, Edit, History, Image } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { getProperty } from 'kotilogi-app/models/propertyData';
import { EventDataType, UtilityDataType } from 'kotilogi-app/models/types';
import Link from 'next/link';
import NextImage from 'next/image';
import { DataRing } from 'kotilogi-app/app/(blackHeader)/(auth)/properties/[property_id]/usage/_components/DataRing';
import { SpaceBetween } from '@/components/New/Spacers';
import { EditLink } from '@/components/New/Links/EditLink';
import { Paragraph } from '@/components/New/Typography/Paragraph';

const UtilityOverview = ({
  propertyId,
  utilityData,
}: {
  propertyId: string;
  utilityData: UtilityDataType[];
}) => {
  return (
    <PreviewContentBase
      icon={<Bolt />}
      preview
      previewDescription={
        <>
          Kulutustietoja ovat kaikki vesi- lämmitys-, sähkö, sekä muut kulut, joita taloudessa voi
          olla.
        </>
      }
      headingText='Kulutustiedot'
      addNewUrl={`/newDashboard/properties/${propertyId}/utility/add`}
      showAllUrl={`/newDashboard/properties/${propertyId}/utility`}>
      {!utilityData.length ? (
        <span className='text-slate-500'>Ei Kulutustietoja.</span>
      ) : (
        <div className='flex w-full justify-start gap-4'>
          <DataRing
            data={utilityData}
            label='Kaikki'
          />

          <Paragraph>
            Tässä näet talon koko kulutuksen.
            <br /> Tarkemmat tiedot näet klikkaamalla{' '}
            <Link
              className='text-teal-500'
              href={`/newDashboard/properties/${propertyId}/utility`}>
              Näytä Lisää.
            </Link>
          </Paragraph>
        </div>
      )}
    </PreviewContentBase>
  );
};

export default async function PropertyPage({ params }) {
  const id = params.propertyId;
  const property = await getProperty(id);

  const events = await db('propertyEventData')
    .join('objectData', { 'objectData.id': 'propertyEventData.id' })
    .where({ parentId: id })
    .limit(3);

  const utility = await db('utilityData')
    .join('objectData', { 'objectData.id': 'utilityData.id' })
    .where({ parentId: id });

  const images = await db('fileData')
    .join('objectData', { 'objectData.id': 'fileData.id' })
    .where({ parentId: id })
    .limit(3);

  return (
    <Main>
      <OverviewBox
        title={property.streetAddress + ' ' + (property.appartmentNumber || '')}
        description={property.description || 'Ei Kuvausta.'}
        imageUrl='/img/Properties/default-bg.jpg'
        editUrl={`/newDashboard/properties/${property.id}/edit`}
        editContentText='Muokkaa Tietoja'
        editIcon={<Edit />}
      />

      <PreviewContentRow<EventDataType>
        icon={<History />}
        headingText='Viimeisimmät tapahtumat'
        itemsToDisplay={3}
        showAllUrl={`/newDashboard/properties/${property.id}/events`}
        data={events}
        addNewUrl={`/newDashboard/properties/${property.id}/events/add`}
        PreviewComponent={({ item }) => {
          return (
            <Link
              href={`/newDashboard/properties/${property.id}/events/${item.id}`}
              className='hover:no-underline'>
              <Card
                title={item.title}
                description={item.description || 'Ei Kuvausta.'}
                imageSrc='/img/Properties/default-bg.jpg'
                HeaderComponent={() => {
                  return (
                    <>
                      <IconLink
                        title='Näytä tiedostot'
                        href=''
                        icon={<Image sx={{ color: 'white' }} />}
                      />
                    </>
                  );
                }}
              />
            </Link>
          );
        }}
        onEmptyElement={<span className='text-slate-500'>Ei Tapahtumia.</span>}
      />

      <UtilityOverview
        propertyId={property.id}
        utilityData={utility}
      />
      <PreviewContentRow<TODO>
        icon={<Image />}
        preview
        headingText='Tiedostot ja kuvat'
        itemsToDisplay={3}
        data={images}
        addNewUrl={`/newDashboard/properties/${property.id}/files/add`}
        showAllUrl={`/newDashboard/properties/${id}/files`}
        onEmptyElement={<span className='text-slate-500'>Ei tiedostoja.</span>}
        PreviewComponent={({ item }) => {
          return (
            <Link
              href={`/files/${item.id}`}
              className='rounded-lg shadow-md overflow-hidden aspect-square w-[250px]'>
              <NextImage
                src={`/files/${item.id}`}
                objectFit='cover'
                fill={true}
                alt=''
              />
            </Link>
          );
        }}
      />
    </Main>
  );
}
