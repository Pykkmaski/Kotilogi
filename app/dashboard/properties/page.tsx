import { Main } from '@/components/New/Main';
import { OverviewBoxList } from '@/components/New/Prefabs/OverviewBoxList';
import { Edit } from '@mui/icons-material';
import { AppartmentPayloadType, HousePayloadType } from 'kotilogi-app/dataAccess/types';
import { PropertyOverview } from './[propertyId]/_components/PropertyOverview';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import db from 'kotilogi-app/dbconfig';
import { properties } from 'kotilogi-app/dataAccess/properties';
import { redirect } from 'next/navigation';
import { verifySession } from 'kotilogi-app/utils/verifySession';

export default async function PropertiesPage() {
  const session = await verifySession();
  const data = (await properties.getPropertiesOfUser(session.user.id)) as (
    | HousePayloadType
    | AppartmentPayloadType
  )[];

  if (data.length == 1) {
    //redirect(`properties/${data.at(0).id}`);
  }

  return (
    <main className='flex justify-center'>
      <div className='md:w-[75%] xs:w-full'>
        <OverviewBoxList
          items={data}
          listTitle='Talot'
          onEmptyElement={
            <GalleryError
              title='Ei taloja'
              message='Et ole vielä lisännyt taloja.'
              icon={'fa fa-home'}
            />
          }
          addButtonUrl='/dashboard/properties/add'
          OverviewComponent={async ({ item }) => {
            const owners = await db('data_propertyOwners').where({ propertyId: item.id });
            return (
              <PropertyOverview
                owners={owners}
                property={item}
                editUrl={`/dashboard/properties/${item.id}/edit`}
                showUrl={`/dashboard/properties/${item.id}`}
                editContentText='Muokkaa'
                editIcon={<Edit />}
              />
            );
          }}
        />
      </div>
    </main>
  );
}
