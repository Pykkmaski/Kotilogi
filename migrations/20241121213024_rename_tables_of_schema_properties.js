/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('properties')
    .renameTable('data_properties', 'base')
    .renameTable('data_appartments', 'appartments')
    .renameTable('data_houses', 'houses')
    .renameTable('ref_propertyTypes', 'propertyTypes')
    .renameTable('ref_buildingMaterials', 'buildingMaterials')
    .renameTable('ref_buildingTypes', 'buildingTypes')
    .renameTable('ref_roofTypes', 'roofTypes')
    .renameTable('ref_roofMaterials', 'roofMaterials')
    .renameTable('ref_yardOwnershipTypes', 'yardOwnershipTypes')
    .renameTable('ref_energyClasses', 'energyClasses')
    .renameTable('ref_heatingTypes', 'heatingTypes');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('properties')
    .renameTable('base', 'data_properties')
    .renameTable('appartments', 'data_appartments')
    .renameTable('houses', 'data_houses')
    .renameTable('propertyTypes', 'ref_propertyTypes')
    .renameTable('buildingMaterials', 'ref_buildingMaterials')
    .renameTable('buildingTypes', 'ref_buildingTypes')
    .renameTable('roofTypes', 'ref_roofTypes')
    .renameTable('roofMaterials', 'ref_roofMaterials')
    .renameTable('yardOwnershipTypes', 'ref_yardOwnershipTypes')
    .renameTable('energyClasses', 'ref_energyClasses')
    .renameTable('heatingTypes', 'ref_heatingTypes');
};
