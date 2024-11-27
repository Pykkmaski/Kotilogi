import { getRefs } from 'kotilogi-app/dataAccess/ref';
import db from 'kotilogi-app/dbconfig';

export const getPropertyRefs = async () => {
  const buildingTypes = await db('properties.buildingTypes');
  const buildingMaterials = await db('properties.buildingMaterials');
  const propertyTypes = await db('properties.propertyTypes');
  const roofTypes = await db('roofs.types');
  const roofMaterials = await db('roofs.materials');
  const yardOwnershipTypes = await db('properties.yardOwnershipTypes');
  const heatingTypes = await db('properties.heatingTypes');
  const energyClasses = await db('properties.energyClasses');
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
