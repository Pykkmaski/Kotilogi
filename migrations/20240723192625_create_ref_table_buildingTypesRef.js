/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const refTable = 'ref_propertyTypes';
const table = 'ref_buildingTypes';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.increments('id');
    tbl.string('label', 20).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
