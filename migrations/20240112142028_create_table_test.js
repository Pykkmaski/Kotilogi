/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'test';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    tbl.string('id').primary().notNullable().defaultTo(knex.fn.uuid());
    tbl.string('testId').notNullable();
    tbl.string('testContent');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
