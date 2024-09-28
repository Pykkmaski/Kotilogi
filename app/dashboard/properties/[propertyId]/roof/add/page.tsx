import { getRefs } from 'kotilogi-app/dataAccess/ref';
import { AddRoofForm } from './AddRoofForm';

export default async function AddRoofPage({ propertyId }) {
  const { roofTypes, roofMaterials } = await getRefs('ref_roofTypes', 'ref_roofMaterials');
  return (
    <main className='flex flex-col w-full items-center'>
      <AddRoofForm
        roofMaterials={roofMaterials}
        roofTypes={roofTypes}
        propertyId={propertyId}
      />
    </main>
  );
}
