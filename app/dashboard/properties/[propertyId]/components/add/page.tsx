import db from 'kotilogi-app/dbconfig';
import { AddComponentForm } from './AddComponentForm';
import { AddComponentProvider } from './AddComponentProvider';
import { getRefs } from 'kotilogi-app/dataAccess/ref';

const getRefTableContent = async (tablename: string) => {
  if (!tablename.includes('ref_')) {
    throw new Error('The table name must point to a ref_ table!');
  }

  return db(tablename);
};

export default async function AddComponentPage({ params }) {
  const refs = await getRefs(
    'ref_propertyTypes',
    'ref_energyClasses',
    'ref_buildingMaterials',
    'ref_buildingTypes',
    'ref_roofMaterials',
    'ref_roofTypes',
    'ref_yardOwnershipTypes',
    'ref_heatingCircuitTypes',
    'ref_mainColors',
    'ref_heatingSystemTypes'
  );

  return (
    <main className='w-full flex justify-center'>
      <AddComponentProvider refs={refs}>
        <AddComponentForm propertyId={params.propertyId} />
      </AddComponentProvider>
    </main>
  );
}
