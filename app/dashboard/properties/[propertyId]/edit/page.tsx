import { Main } from '@/components/New/Main';
import { getProperty } from 'kotilogi-app/models/propertyData';
import { PropertyForm } from '../../add/_components/PropertyForm';
import { TargetTypeField } from 'kotilogi-app/app/dashboard/_components/NewAddPropertyModal/Form/TargetTypeField';
import { getRefTableContent } from '@/actions/util/getRefTableContent';

export default async function EditPropertyPage({ params }) {
  const id = params.propertyId;
  const property = await getProperty(id);
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
  return (
    <Main>
      <PropertyForm
        mainColors={mainColors}
        yardOwnershipTypes={yardOwnershipTypes}
        energyClasses={energyClasses}
        buildingTypes={buildingTypes}
        roofTypes={roofTypes}
        roofMaterials={roofMaterials}
        property={property}
        propertyTypes={propertyTypes}
        heatingTypes={heatingTypes}
        buildingMaterials={buildingMaterials}
      />
    </Main>
  );
}
