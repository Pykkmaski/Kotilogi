/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const refTableName = 'ref_viemariPutketToteutusTapa';
const dataTableName = 'data_viemariPutketEvents';

exports.up = function (knex) {
  return knex.schema
    .createTable(refTableName, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable(dataTableName, tbl => {
      tbl
        .uuid('id')
        .primary()
        .references('id')
        .inTable('data_propertyEvents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('toteutusTapaId')
        .notNullable()
        .references('id')
        .inTable(refTableName)
        .onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(refTableName).dropTableIfExists(dataTableName);
};
