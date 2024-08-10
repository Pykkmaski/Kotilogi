/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_properties';
const oldcol = 'color';
const newcol = 'mainColorId';
const foreignName = 'FK_MAIN_COLOR';

exports.up = function (knex) {
  return knex.schema
    .alterTable(table, tbl => {
      tbl
        .foreign(oldcol, foreignName)
        .references('id')
        .inTable('ref_mainColors')
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
      tbl.dropForeign(newcol, foreignName);
    })
    .alterTable(table, tbl => tbl.renameColumn(newcol, oldcol));
};
