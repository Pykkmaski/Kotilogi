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
import { EventDataType, FileDataType, UtilityDataType } from 'kotilogi-app/models/types';
import { FileCard } from '@/components/New/FileCard';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { getFiles } from 'kotilogi-app/models/fileData';

export default async function PropertyPage({ params }) {
  const id = params.propertyId;
  const property = await getProperty(id);
  const [owners, events, utility, files, [{ numEvents }], [mainImageId]] = (await Promise.all([
    db('data_propertyOwners')
      .where({ propertyId: property.id })
      .join('data_users', { 'data_users.id': 'data_propertyOwners.userId' })
      .pluck('email'),

    db('data_objects')
      .join('data_propertyEvents', 'data_propertyEvents.id', '=', 'data_objects.id')
      .where({ 'data_objects.parentId': id })
      .limit(4),

    db('data_objects')
      .join('data_utilities', { 'data_utilities.id': 'data_objects.id' })
      .where({ parentId: id }),

    getFiles({ parentId: id }, 4),

    db('data_objects')
      .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
      .where({ parentId: property.id })
      .count('*', { as: 'numEvents' }),

    db('data_mainImages').where({ objectId: property.id }).pluck('imageId'),
  ])) as [
    string[],
    EventDataType[],
    UtilityDataType[],
    FileDataType[],
    [{ numEvents: number }],
    [string]
  ];

  return (
    <Main>
      <SecondaryHeading>Talo</SecondaryHeading>
      <PropertyOverview
        owners={owners}
        property={property}
        numEvents={numEvents}
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
        addNewUrl={`/newDashboard/files/add?parentId=${property.id}`}
        showAllUrl={`/newDashboard/properties/${id}/files`}
        PreviewComponent={({ item }) => {
          return (
            <FileCard
              file={item}
              isMain={item.id == mainImageId}
            />
          );
        }}
      />
    </Main>
  );
}
