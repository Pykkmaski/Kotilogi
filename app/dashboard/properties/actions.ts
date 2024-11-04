import { getRefs } from 'kotilogi-app/dataAccess/ref';

export const getPropertyRefs = async () =>
  await getRefs(
    'ref_buildingTypes',
    'ref_buildingMaterials',
    'ref_mainColors',
    'ref_propertyTypes',
    'ref_roofTypes',
    'ref_roofMaterials',
    'ref_yardOwnershipTypes',
    'ref_heatingTypes',
    'ref_energyClasses'
  );
