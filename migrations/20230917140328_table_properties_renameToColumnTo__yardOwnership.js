/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/**
 * Fix a typo in the yardOwnership column.
 */
const tableName = 'properties';
const newColumnName = 'yardOwnership';
const oldColumnName = 'yardOwnerhip';

exports.up = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.renameColumn(oldColumnName, newColumnName);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tableName, tbl => {
    tbl.renameColumn(newColumnName, oldColumnName);
  });
    
};
