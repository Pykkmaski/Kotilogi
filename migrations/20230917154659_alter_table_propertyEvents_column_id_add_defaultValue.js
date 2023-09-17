/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'propertyEvents';

exports.up = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.string('id').defaultTo(knex.fn.uuid()).alter();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
