import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import db from 'kotilogi-app/dbconfig';
import { AppartmentDataType, HouseDataType } from 'kotilogi-app/models/types';
import { LabelGrid } from '@/components/New/LabelGrid';

type PropertyOverviewProps = {
  property: AppartmentDataType | HouseDataType;
  owners?: string[];
  editIcon: React.ReactNode;
  editUrl: string;
  showUrl?: string;
  imageUrl?: string;
  editContentText: string;
  numEvents: number;
};

export async function PropertyOverview({
  property,
  editIcon,
  editUrl,
  editContentText,
  showUrl,
  owners,
  numEvents,
  imageUrl,
}: PropertyOverviewProps) {
  const [mainImageId] =
    (await db('data_mainImages').where({ objectId: property.id }).pluck('imageId')) || [];
  const [propertyType] = await db('ref_propertyTypes')
    .where({ id: property.propertyTypeId })
    .pluck('name');
  const [buildingType] = await db('ref_buildingTypes')
    .where({ id: property.buildingTypeId })
    .pluck('name');

  return (
    <OverviewBox
      showUrl={showUrl}
      deleteUrl={`/newDashboard/properties/${property.id}/delete`}
      title={
        property.streetAddress +
        ' ' +
        (('appartmentNumber' in property && property.appartmentNumber) || '')
      }
      description={
        <div className='flex flex-col h-full gap-4'>
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
                value={propertyType}
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
            </LabelGrid>
          </div>
        </div>
      }
      imageUrl={(mainImageId && `/api/files/${mainImageId}`) || '/img/Properties/default-bg.jpg'}
      editUrl={editUrl}
      editContentText={editContentText}
      editIcon={editIcon}
    />
  );
}
