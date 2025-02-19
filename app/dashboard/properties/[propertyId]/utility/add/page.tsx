import { Main } from '@/components/New/Main';
import db from 'kotilogi-app/dbconfig';
import { UtilityBatchForm } from './UtilityBatchForm';

export default async function AddUtilityPage({ params }) {
  const { propertyId } = await params;
  const utilityTypes = await db('ref_utilityTypes');
  return (
    <main className='flex justify-center'>
      <div className='xl:w-[90%] xs:w-full'>
        <UtilityBatchForm
          propertyId={propertyId}
          utilityTypes={utilityTypes}
        />
      </div>
    </main>
  );
}
