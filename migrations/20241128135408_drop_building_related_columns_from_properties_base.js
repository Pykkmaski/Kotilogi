/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('properties').alterTable('base', tbl => {
    tbl.dropColumn('buildingMaterialId');
    tbl.dropColumn('buildingTypeId');
    tbl.dropColumn('buildYear');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('properties').alterTable('base', tbl => {
    tbl
      .integer('buildingMaterialId')
      .references('id')
      .inTable('buildings.materials')
      .onUpdate('CASCADE');
    tbl.integer('buildingTypeId').references('id').inTable('buildings.types').onUpdate('CASCADE');
    tbl.integer('buildYear');
  });
};
