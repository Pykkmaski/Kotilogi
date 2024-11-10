import { Main } from '@/components/New/Main';
import { Edit } from '@mui/icons-material';
import db from 'kotilogi-app/dbconfig';
import { UtilityPreview } from './_components/UtilityPreview';
import { EventPreview } from './_components/EventPreview';
import { FileOverview } from '@/components/New/Prefabs/FileOverview';
import { PropertyOverview } from './_components/PropertyOverview';
import { FileCard } from '@/components/New/FileCard';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { getFiles } from 'kotilogi-app/dataAccess/fileData';
import { UtilityProvider } from './utility/UtilityContext';
import { properties } from 'kotilogi-app/dataAccess/properties';
import { utilities } from 'kotilogi-app/dataAccess/utilities';

export default async function PropertyPage({ params }) {
  const id = params.propertyId;
  const data = await properties.get(id);

  //Fetch additional data back-to-back to conserve db connection pool.
  const owners = await db('data_propertyOwners')
    .where({ propertyId: data.id })
    .join('data_users', { 'data_users.id': 'data_propertyOwners.userId' })
    .pluck('email');

  const utilityData = await utilities.get(data.id);
  const files = await getFiles({ parentId: id }, 4);
  const [mainImageId] = await db('data_mainImages').where({ objectId: data.id }).pluck('imageId');
  return (
    <Main>
      <SecondaryHeading>Talo</SecondaryHeading>
      <PropertyOverview
        owners={owners}
        property={data}
        editContentText='Muokkaa tietoja'
        editIcon={<Edit />}
        editUrl={`/dashboard/properties/${data.id}/edit`}
      />

      <div className='flex w-full md:gap-4 xs:gap-2 xs:flex-col md:flex-row'>
        <div className='xs:w-full lg:max-w-[50%]'>
          <EventPreview propertyId={data.id} />
        </div>

        <div className='xs:w-full lg:max-w-[50%] h-full'>
          <UtilityProvider
            data={utilityData}
            year={null}
            selectedTypes={[]}>
            <UtilityPreview propertyId={data.id} />
          </UtilityProvider>
        </div>
      </div>

      <FileOverview
        files={files}
        addNewUrl={`/dashboard/files/add?parentId=${data.id}`}
        showAllUrl={`/dashboard/files?parentId=${data.id}&returnUrl=/dashboard/properties/${data.id}`}
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
