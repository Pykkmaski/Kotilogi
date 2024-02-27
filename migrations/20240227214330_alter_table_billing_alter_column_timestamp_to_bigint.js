/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'billing';
const columname = 'timestamp';

exports.up = function(knex) {
    return knex.schema.alterTable(tablename, tbl => {
        tbl.bigint(columname).alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.string(columname).alter();
  })
};
