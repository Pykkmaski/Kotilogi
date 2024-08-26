import { Main } from '@/components/New/Main';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { getProperty } from 'kotilogi-app/models/propertyData';
import { UtilityPreview } from './_components/UtilityPreview';
import { EventPreview } from './_components/EventPreview';
import { FileOverview } from '@/components/New/Prefabs/FileOverview';
import { PropertyOverview } from './_components/PropertyOverview';
import { FileCard } from '@/components/New/FileCard';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { getFiles } from 'kotilogi-app/models/fileData';
import { UtilityProvider } from './utility/UtilityContext';
import { getUtilityData } from 'kotilogi-app/models/utilityData';

export default async function PropertyPage({ params }) {
  const id = params.propertyId;

  const property = await getProperty(id);

  //Fetch additional data back-to-back to conserve db connection pool.
  const owners = await db('data_propertyOwners')
    .where({ propertyId: property.id })
    .join('data_users', { 'data_users.id': 'data_propertyOwners.userId' })
    .pluck('email');

  const utilityData = await getUtilityData({ parentId: property.id });
  console.log(utilityData);
  const files = await getFiles({ parentId: id }, 4);

  const [{ numEvents }] = await db('data_objects')
    .join('data_propertyEvents', { 'data_propertyEvents.id': 'data_objects.id' })
    .where({ parentId: property.id })
    .count('*', { as: 'numEvents' });

  const [mainImageId] = await db('data_mainImages')
    .where({ objectId: property.id })
    .pluck('imageId');

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

      <EventPreview propertyId={property.id} />

      <UtilityProvider
        data={utilityData}
        year={null}
        selectedTypes={[]}>
        <UtilityPreview propertyId={property.id} />
      </UtilityProvider>

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