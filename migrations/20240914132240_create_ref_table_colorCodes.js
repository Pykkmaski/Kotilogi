/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_colorCodes';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.increments('id');
    tbl.string('key', 10).notNullable().comment('The official code of the color.');
    tbl.string('name', 20).comment('The name of the color.');
    tbl.string('hex', 20).comment('The hex-code of the color.');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
