import { Main } from '@/components/New/Main';
import db from 'kotilogi-app/dbconfig';
import { UtilityBatchForm } from './UtilityBatchForm';

export default async function AddUtilityPage({ params }) {
  const propertyId = params.propertyId;
  const utilityTypes = await db('ref_utilityTypes');
  return (
    <main className='flex justify-center'>
      <UtilityBatchForm
        propertyId={propertyId}
        utilityTypes={utilityTypes}
      />
    </main>
  );
}
