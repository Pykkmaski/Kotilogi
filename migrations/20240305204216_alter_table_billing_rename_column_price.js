/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'billing';
const oldcolumnname = 'price';
const newcolumnname = 'amount';

exports.up = function(knex) {
  return knex.schema.alterTable(tablename, tbl => {
    tbl.renameColumn(oldcolumnname, newcolumnname);
  });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable(tablename, tbl => {
        tbl.renameColumn(newcolumnname, oldcolumnname);
    });
};
