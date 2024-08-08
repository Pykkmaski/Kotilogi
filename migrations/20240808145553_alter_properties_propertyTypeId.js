/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_properties';
const oldcol = 'propertyType';
const newcol = 'propertyTypeId';

exports.up = function (knex) {
  return knex.schema
    .alterTable(table, tbl => {
      tbl
        .integer(oldcol)
        .notNullable()
        .references('id')
        .inTable('ref_propertyTypes')
        .onUpdate('CASCADE')
        .alter();
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
      tbl.integer(newcol).notNullable().alter();
    })
    .alterTable(table, tbl => tbl.renameColumn(newcol, oldcol));
};
