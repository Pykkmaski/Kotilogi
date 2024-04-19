/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tablename = 'usage';

exports.up = function (knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.integer('unitAmount').defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.dropColumn(tablename);
  });
};
