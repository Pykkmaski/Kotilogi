import db from './dbconfig';

export const propertyTypeIds = {};

db('ref_propertyTypes').then(types => {
  types.map(type => (propertyTypeIds[type.name] = type.id));
});
