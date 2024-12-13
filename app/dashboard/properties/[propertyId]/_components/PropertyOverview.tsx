import { OverviewImage } from '@/components/New/Boxes/OverviewBox';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import db from 'kotilogi-app/dbconfig';
import { AppartmentPayloadType, HousePayloadType } from 'kotilogi-app/dataAccess/types';
import { LabelGrid } from '@/components/New/LabelGrid';
import { Spacer } from '@/components/UI/Spacer';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { DialogPrefab, VPDialog } from '@/components/UI/VPDialog';
import { DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { SelectImageDialog } from '@/components/Feature/SelectImageDialog/SelectImageDialog';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { CopyAll, Delete, Edit, MoreVert, Person } from '@mui/icons-material';
import Link from 'next/link';
import { FalseInput } from '@/components/UI/FalseInput';
import { TokenGenerationField } from './TokenGenerationField/TokenGenerationField';
import { TransferDialogTrigger } from './TransferDialogTrigger';
import { MenuPrefab, VPMenu } from '@/components/UI/VPMenu';

type PropertyOverviewProps = {
  property: AppartmentPayloadType | HousePayloadType;
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
  const [{ imageCount }] = await db('data_files')
    .join('objects.data', { 'objects.data.id': 'data_files.id' })
    .where({ parentId: property.id })
    .count('*', { as: 'imageCount' });

  const [mainImageId] =
    (await db('data_mainImages').where({ objectId: property.id }).pluck('imageId')) || [];

  const images = await db('data_files')
    .join('objects.data', { 'objects.data.id': 'data_files.id' })
    .where({ parentId: property.id, type: 'image/jpeg' })
    .select('data_files.id as id', 'objects.data.parentId as parentId');

  const [buildingData] = await db('buildings.data')
    .leftJoin('buildings.types', { 'buildings.types.id': 'buildings.data.building_type_id' })
    .where({
      'buildings.data.property_id': property.id,
    })
    .select('buildings.data.*', 'buildings.types.name as building_type_label');

  const [{ numEvents }] = await db('events.data')
    .join('objects.data', { 'objects.data.id': 'events.data.id' })
    .where({ parentId: property.id })
    .count('*', { as: 'numEvents' });

  const title = property.street_name + ' ' + property.street_number;

  if (!buildingData) {
    throw new Error(`
        Failed to load property overview! Building data is missing.
        Details: 
        Property id: ${property.id}
        `);
  }

  return (
    <ContentBox>
      <Spacer
        full
        gap='medium'
        dir='row'>
        {images.length > 0 ? (
          <DialogPrefab
            target={<SelectImageDialog images={images} />}
            trigger={
              <OverviewImage
                src={
                  (mainImageId && `/api/protected/files/${mainImageId}`) ||
                  '/img/Properties/default-bg.jpg'
                }
              />
            }
          />
        ) : (
          <OverviewImage
            src={
              (mainImageId && `/api/protected/files/${mainImageId}`) ||
              '/img/Properties/default-bg.jpg'
            }
          />
        )}

        <div className='flex flex-col w-full gap-4'>
          <Spacer
            dir='row'
            justify='between'
            items='center'
            grow
            full>
            <Link href={`/dashboard/properties/${property.id}`}>
              <SecondaryHeading>{title}</SecondaryHeading>
            </Link>

            <Spacer
              dir='row'
              gap='small'>
              <MenuPrefab
                trigger={
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                }
                target={
                  <VPMenu>
                    <Link href={editUrl}>Muokkaa</Link>
                    <Link href={`/dashboard/properties/${property.id}/report`}>Luo raportti</Link>
                    <TransferDialogTrigger propertyId={property.id} />
                    <Link href={`/dashboard/properties/${property.id}/delete`}>Poista</Link>
                  </VPMenu>
                }></MenuPrefab>
            </Spacer>
          </Spacer>

          <div className='md:w-[50%] xs:w-full'>
            <Paragraph>{property.description || 'Ei kuvausta.'}</Paragraph>
          </div>

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
                value={buildingData.building_type_label || 'Ei määritelty'}
              />

              <LabelGrid.Entry
                label='Rakennusvuosi'
                value={buildingData.build_year || 'Ei määritelty'}
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
        </div>
      </Spacer>
    </ContentBox>
    /*
    <OverviewBox
      showUrl={showUrl}
      deleteUrl={`/dashboard/properties/${property.id}/delete`}
      title={title}
      description={
        <Spacer
          dir='col'
          full>
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
                value={property.build_year || 'Ei määritelty'}
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
    */
  );
}
