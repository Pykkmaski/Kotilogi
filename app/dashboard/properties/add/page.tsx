import { Main } from '@/components/New/Main';
import { PropertyForm } from './_components/PropertyForm';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { verifyUserPropertyCount } from 'kotilogi-app/dataAccess/properties';
import { redirect } from 'next/navigation';
import db from 'kotilogi-app/dbconfig';
import assert from 'assert';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { getRefs } from 'kotilogi-app/dataAccess/ref';
import { getPropertyRefs } from '../actions';

const getRefTableContent = async (tablename: string) => {
  if (!tablename.includes('ref_')) {
    throw new Error('The table name must point to a ref_ table!');
  }

  return db(tablename);
};

export default async function AddPropertyPage() {
  const session = await verifySession();
  try {
    await verifyUserPropertyCount(session);
  } catch (err) {
    //return redirect('/dashboard');
  }

  const refs = await getPropertyRefs();
  console.log(refs);

  return (
    <main className='flex justify-center w-full'>
      <div className='xs:w-full md:w-[50%] flex flex-col gap-4'>
        <SecondaryHeading>Lisää Talo</SecondaryHeading>
        <PropertyForm refs={refs} />
      </div>
    </main>
  );
}
