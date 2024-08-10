/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_houses';
const oldcol = 'yardOwnershipType';
const newcol = 'yardOwnershipTypeId';
const foreignName = 'FK_YARD_OWNERSHIP_TYPE';

exports.up = function (knex) {
  return knex.schema
    .alterTable(table, tbl => {
      tbl
        .foreign(oldcol, foreignName)
        .references('id')
        .inTable('ref_yardOwnershipTypes')
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
