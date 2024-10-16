/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_kayttovesiPutketAsennusTavat';

exports.up = function (knex) {
  return knex.schema
    .createTable(table, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable('data_kayttoVesiPutketEvents', tbl => {
      tbl
        .uuid('id')
        .primary()
        .references('id')
        .inTable('data_propertyEvents')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      tbl
        .integer('asennusTapaId')
        .notNullable()
        .references('id')
        .inTable('ref_kayttovesiPutketAsennusTavat')
        .onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('data_kayttoVesiPutketEvents').dropTableIfExists(table);
};
