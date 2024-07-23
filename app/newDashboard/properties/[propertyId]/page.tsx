import { OverviewBox } from '@/components/New/Boxes/OverviewBox';
import { Main } from '@/components/New/Main';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { getProperty } from 'kotilogi-app/models/propertyData';
import Link from 'next/link';
import NextImage from 'next/image';
import { UtilityPreview } from './_components/UtilityPreview';
import { EventPreview } from './_components/EventPreview';
import { FileOverview } from '@/components/New/Prefabs/FileOverview';
import { Paragraph } from '@/components/New/Typography/Paragraph';
import { ChipData } from '@/components/New/ChipData';
import { PropertyOverview } from './_components/PropertyOverview';

export default async function PropertyPage({ params }) {
  const id = params.propertyId;
  const property = await getProperty(id);

  const events = await db('objectData')
    .join('propertyEventData', { 'propertyEventData.id': 'objectData.id' })
    .where({ parentId: id })
    .limit(4);

  const utility = await db('objectData')
    .join('utilityData', { 'utilityData.id': 'objectData.id' })
    .where({ parentId: id })
    .limit(4);

  const images = await db('objectData')
    .join('fileData', { 'fileData.id': 'objectData.id' })
    .where({ parentId: id })
    .limit(4);

  return (
    <Main>
      <PropertyOverview
        property={property}
        editContentText='Muokkaa tietoja'
        editIcon={<Edit />}
        editUrl={`/newDashboard/properties/${property.id}/edit`}
      />

      <EventPreview
        propertyId={property.id}
        events={events}
      />

      <UtilityPreview
        propertyId={property.id}
        utilityData={utility}
      />

      <FileOverview
        preview
        files={images}
        addNewUrl={`/newDashboard/properties/${property.id}/files/add`}
        showAllUrl={`/newDashboard/properties/${id}/files`}
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
