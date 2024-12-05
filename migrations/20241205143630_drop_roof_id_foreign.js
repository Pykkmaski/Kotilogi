/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('roofs').alterTable('overview', tbl => {
    tbl.dropForeign('id', 'data_roofevents_id_foreign');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('roofs').alterTable('overview', tbl => {
    tbl
      .foreign('id')
      .references('id')
      .inTable('events.data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};
