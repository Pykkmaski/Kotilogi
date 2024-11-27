/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE ?? SET SCHEMA roofs', ['properties.roofMaterials'])
    .raw('ALTER TABLE ?? SET SCHEMA roofs', ['properties.roofTypes'])
    .renameTable('roofs.roofMaterials', 'materials')
    .renameTable('roofs.roofTypes', 'types');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .renameTable('roofs.materials', 'roofMaterials')
    .renameTable('roofs.types', 'roofTypes')
    .raw('ALTER TABLE ?? SET SCHEMA properties', ['roofs.roofMaterials'])
    .raw('ALTER TABLE ?? SET SCHEMA properties', ['roofs.roofTypes']);
};
