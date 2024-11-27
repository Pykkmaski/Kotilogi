/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const newSchemaName = 'properties';

exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE public.data_properties SET SCHEMA ??', [newSchemaName])
    .raw('ALTER TABLE public.data_appartments SET SCHEMA ??', [newSchemaName])
    .raw('ALTER TABLE public.data_houses SET SCHEMA ??', [newSchemaName])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_propertyTypes', newSchemaName])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_buildingTypes', newSchemaName])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_buildingMaterials', newSchemaName])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_roofTypes', newSchemaName])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_roofMaterials', newSchemaName])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_yardOwnershipTypes', newSchemaName])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_energyClasses', newSchemaName])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_heatingTypes', newSchemaName]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('ALTER TABLE properties.data_properties SET SCHEMA ??', ['public'])
    .raw('ALTER TABLE properties.?? SET SCHEMA ??', ['ref_propertyTypes', 'public'])
    .raw('ALTER TABLE properties.data_appartments SET SCHEMA ??', ['public'])
    .raw('ALTER TABLE properties.data_houses SET SCHEMA ??', ['public'])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_propertyTypes', 'public'])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_buildingTypes', 'public'])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_buildingMaterials', 'public'])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_roofTypes', 'public'])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_roofMaterials', 'public'])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_yardOwnershipTypes', 'public'])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_energyClasses', 'public'])
    .raw('ALTER TABLE public.?? SET SCHEMA ??', ['ref_heatingTypes', 'public']);
};
