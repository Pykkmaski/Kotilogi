import { Main } from '@/components/New/Main';
import db from 'kotilogi-app/dbconfig';
import { UtilityBatchForm } from './_components/UtilityBatchForm';

export default async function AddUtilityPage({ params }) {
  const propertyId = params.propertyId;
  const utilityTypes = await db('ref_utilityTypes');
  return (
    <Main>
      <UtilityBatchForm
        propertyId={propertyId}
        utilityTypes={utilityTypes}
      />
    </Main>
  );
}
