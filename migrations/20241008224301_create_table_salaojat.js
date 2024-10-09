/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_drainageDitchEvents';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .uuid('id')
      .notNullable()
      .references('id')
      .inTable('data_propertyEvents')
      .onUpdate('CASCADE');
    tbl.float('salaojaSepeli');
    tbl.float('routaEristys');
    tbl.float('murskeReunus');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
