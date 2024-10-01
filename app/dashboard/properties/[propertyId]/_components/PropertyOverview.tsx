import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import db from 'kotilogi-app/dbconfig';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/dataAccess/types';
import { LabelGrid } from '@/components/New/LabelGrid';
import { Spacer } from '@/components/New/Spacer';

type PropertyOverviewProps = {
  property: AppartmentDataType | HouseDataType;
  owners?: string[];
  editIcon: React.ReactNode;
  editUrl: string;
  showUrl?: string;

  editContentText: string;
};

export async function PropertyOverview({
  property,
  editIcon,
  editUrl,
  editContentText,
  showUrl,
  owners,
}: PropertyOverviewProps) {
  const [mainImageId] =
    (await db('data_mainImages').where({ objectId: property.id }).pluck('imageId')) || [];
  const [buildingType] = await db('ref_buildingTypes')
    .where({ id: property.buildingTypeId })
    .pluck('name');

  const [{ numEvents }] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ parentId: property.id })
    .count('*', { as: 'numEvents' });

  return (
    <OverviewBox
      showUrl={showUrl}
      deleteUrl={`/dashboard/properties/${property.id}/delete`}
      title={
        property.streetAddress +
        ' ' +
        (('appartmentNumber' in property && property.appartmentNumber) || '')
      }
      description={
        <Spacer
          direction='col'
          height='full'>
          <Paragraph>{property.description || 'Ei kuvausta.'}</Paragraph>

          <div className='w-full xs:hidden md:block'>
            <LabelGrid
              header={
                <div className='flex gap-2 items-center'>
                  <h1 className='text-sm font-semibold'>Tiedot</h1>
                </div>
              }>
              <LabelGrid.Entry
                label={'Kiinteistötyyppi'}
                value={property.propertyTypeName}
              />

              <LabelGrid.Entry
                label='Rakennustyyppi'
                value={buildingType}
              />

              <LabelGrid.Entry
                label='Rakennusvuosi'
                value={property.buildYear || 'Ei määritelty'}
              />

              <LabelGrid.Entry
                label={'Omistajat'}
                value={owners.length}
              />

              <LabelGrid.Entry
                label='Tapahtumien lukumäärä'
                value={numEvents}
              />
            </LabelGrid>
          </div>
        </Spacer>
      }
      imageUrl={
        (mainImageId && `/api/protected/files/${mainImageId}`) || '/img/Properties/default-bg.jpg'
      }
      editUrl={editUrl}
      editContentText={editContentText}
      editIcon={editIcon}
    />
  );
}
