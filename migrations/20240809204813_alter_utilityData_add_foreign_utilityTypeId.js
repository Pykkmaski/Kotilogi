/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_utilities';
const oldcol = 'type';
const newcol = 'typeId';
const foreignName = 'FK_UTILITY_TYPE';

exports.up = function (knex) {
  return knex.schema
    .alterTable(table, tbl => {
      tbl
        .foreign(oldcol, foreignName)
        .references('id')
        .inTable('ref_utilityTypes')
        .onUpdate('CASCADE');
    })
    .alterTable(table, tbl => tbl.renameColumn(oldcol, newcol));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable(table, tbl => {
      tbl.dropForeign(newcol);
    })
    .alterTable(table, tbl => tbl.renameColumn(newcol, oldcol));
};
