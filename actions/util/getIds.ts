'use server';

import db from 'kotilogi-app/dbconfig';

export async function getRefTableContent(
  refTableName:
    | 'ref_propertyTypes'
    | 'ref_utilityTypes'
    | 'ref_buildingMaterials'
    | 'ref_buildingTypes'
    | 'ref_roofTypes'
    | 'ref_roofMaterials'
    | 'ref_yardOwnershipTypes'
    | 'ref_energyClasses'
    | 'ref_heatingTypes'
    | 'ref_mainColors'
) {
  return (await db(refTableName)).reduce((obj, entry) => {
    obj[entry.name] = entry.id;
    return obj;
  }, {});
}
