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
import { FileDataType } from 'kotilogi-app/models/types';
import { FileCard } from '@/components/New/FileCard';
import { SecondaryHeading } from '@/components/New/Typography/Headings';

export default async function PropertyPage({ params }) {
  const id = params.propertyId;
  const property = await getProperty(id);

  const owners = await db('data_propertyOwners')
    .where({ propertyId: property.id })
    .join('data_users', { 'data_users.id': 'data_propertyOwners.userId' })
    .pluck('email');

  const events = await db('data_objects')
    .join('data_propertyEvents', 'data_propertyEvents.id', '=', 'data_objects.id')
    .where({ 'data_objects.parentId': id })
    .limit(4);

  const utility = await db('data_objects')
    .join('data_utilities', { 'data_utilities.id': 'data_objects.id' })
    .where({ parentId: id });

  const files = (await db('data_objects')
    .join('data_files', { 'data_files.id': 'data_objects.id' })
    .where({ parentId: id })
    .limit(4)) as FileDataType[];

  return (
    <Main>
      <SecondaryHeading>Talo</SecondaryHeading>
      <PropertyOverview
        owners={owners}
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
        files={files}
        addNewUrl={`/newDashboard/properties/${property.id}/files/add`}
        showAllUrl={`/newDashboard/properties/${id}/files`}
        PreviewComponent={({ item }) => {
          return <FileCard file={item} />;
        }}
      />
    </Main>
  );
}
