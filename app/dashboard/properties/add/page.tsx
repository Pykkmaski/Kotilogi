import { Main } from '@/components/New/Main';
import { PropertyForm } from './_components/PropertyForm';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { verifyUserPropertyCount } from 'kotilogi-app/dataAccess/properties';
import { redirect } from 'next/navigation';
import db from 'kotilogi-app/dbconfig';
import assert from 'assert';

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

  const [
    propertyTypes,
    energyClasses,
    buildingMaterials,
    buildingTypes,
    roofMaterials,
    roofTypes,
    yardOwnershipTypes,
    heatingTypes,
    mainColors,
  ] = await Promise.all([
    getRefTableContent('ref_propertyTypes'),
    getRefTableContent('ref_energyClasses'),
    getRefTableContent('ref_buildingMaterials'),
    getRefTableContent('ref_buildingTypes'),
    getRefTableContent('ref_roofMaterials'),
    getRefTableContent('ref_roofTypes'),
    getRefTableContent('ref_yardOwnershipTypes'),
    getRefTableContent('ref_heatingTypes'),
    getRefTableContent('ref_mainColors'),
  ]);
  console.log(heatingTypes);
  return (
    <Main>
      <PropertyForm
        propertyTypes={propertyTypes}
        energyClasses={energyClasses}
        buildingMaterials={buildingMaterials}
        buildingTypes={buildingTypes}
        roofMaterials={roofMaterials}
        roofTypes={roofTypes}
        yardOwnershipTypes={yardOwnershipTypes}
        mainColors={mainColors}
        heatingTypes={heatingTypes}
      />
    </Main>
  );
}
