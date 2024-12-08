/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('property').alterTable('overview', tbl => {
    tbl.dropColumn('roofTypeId');
    tbl.dropColumn('roofMaterialId');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('property').alterTable('overview', tbl => {
    tbl.integer('roofTypeId').references('id').inTable('roofs.types').onUpdate('CASCADE');
    tbl.integer('roofMaterialId').references('id').inTable('roofs.materials').onUpdate('CASCADE');
  });
};
