/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'properties';
const column = 'targetType';

exports.up = function (knex) {
  return knex.schema.table(table, tbl => {
    tbl.string(column).notNullable().checkIn(['Kiinteistö', 'Huoneisto']).defaultTo('Kiinteistö');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table(table, tbl => tbl.dropColumn(column));
};
