import { getRefs } from 'kotilogi-app/dataAccess/ref';
import db from 'kotilogi-app/dbconfig';

/**Returns the various types, with their id and label, related to properties, like building, heating types, etc. */
export const getPropertyRefs = async () => {
  const buildingTypes = await db('types.building_type');
  const buildingMaterials = await db('types.building_material_type');
  const propertyTypes = await db('types.property_type');
  const roofTypes = await db('types.roof_type');
  const roofMaterials = await db('types.roof_material_type');
  const yardOwnershipTypes = await db('types.yard_ownership_type');
  const heatingTypes = await db('types.heating_type');
  const energyClasses = await db('types.energy_class_type');
  const refs = await getRefs('ref_mainColors');

  return {
    ...refs,
    buildingMaterials,
    buildingTypes,
    propertyTypes,
    roofTypes,
    roofMaterials,
    yardOwnershipTypes,
    heatingTypes,
    energyClasses,
  };
};
