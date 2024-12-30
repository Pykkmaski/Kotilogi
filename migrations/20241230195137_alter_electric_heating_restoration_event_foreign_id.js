/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('restoration_events')
    .alterTable('electric_heating_restoration_event', tbl => {
      tbl.dropForeign('id', 'data_electricheatingevents_id_foreign');
    })
    .alterTable('electric_heating_restoration_event', tbl => {
      tbl.renameColumn('id', 'event_id');
      tbl
        .foreign('event_id')
        .references('id')
        .inTable('event')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
