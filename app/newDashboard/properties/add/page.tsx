import { Main } from '@/components/New/Main';
import { PropertyForm } from './_components/PropertyForm';
import { getRefTableContent } from '@/actions/util/getIds';

export default async function AddPropertyPage() {
  const [
    propertyTypes,
    energyClasses,
    buildingMaterials,
    buildingTypes,
    roofMaterials,
    roofTypes,
    yardOwnershipTypes,
    heatingTypes,
  ] = await Promise.all([
    getRefTableContent('ref_propertyTypes'),
    getRefTableContent('ref_energyClasses'),
    getRefTableContent('ref_buildingMaterials'),
    getRefTableContent('ref_buildingTypes'),
    getRefTableContent('ref_roofMaterials'),
    getRefTableContent('ref_roofTypes'),
    getRefTableContent('ref_yardOwnershipTypes'),
    getRefTableContent('ref_heatingTypes'),
  ]);

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
        heatingTypes={heatingTypes}
      />
    </Main>
  );
}
