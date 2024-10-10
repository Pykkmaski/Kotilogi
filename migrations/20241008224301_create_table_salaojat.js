/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const methodRefTable = 'ref_drainageDitchMethods';
const table = 'data_drainageDitchEvents';

exports.up = function (knex) {
  return knex.schema
    .createTable(methodRefTable, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique().notNullable();
    })
    .createTable(table, tbl => {
      tbl
        .uuid('id')
        .notNullable()
        .references('id')
        .inTable('data_propertyEvents')
        .onUpdate('CASCADE');

      tbl
        .integer('toteutusTapaId')
        .notNullable()
        .references('id')
        .inTable('ref_drainageDitchMethods')
        .onUpdate('CASCADE');

      tbl.float('salaojaSepeli');

      tbl.float('murskeReunus');
      tbl.integer('routaEristys');
      tbl.boolean('sadevesiPutket');
      tbl.boolean('pumppuKaivo');
      tbl.boolean('kallioTyo');
      tbl.boolean('suodatinKangas');
      tbl.boolean('tarkastusKaivot');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(methodRefTable).dropTableIfExists(table);
};
