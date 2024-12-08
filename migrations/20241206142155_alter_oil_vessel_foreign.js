/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('heating')
    .alterTable('oil_vessel', tbl => {
      tbl.dropForeign('id', 'data_oilheatingevents_id_foreign');
      tbl.renameColumn('id', 'heating_id');
      tbl
        .foreign('heating_id')
        .references('id')
        .inTable('heating.data')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .raw('ALTER TABLE heating.oil_vessel ALTER COLUMN heating_id SET NOT NULL');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('heating').alterTable('oil_vessel', tbl => {
    tbl.dropForeign('heating_id');
    tbl.renameColumn('heating_id', 'id');
    tbl
      .foreign('id')
      .references('id')
      .inTable('data_baseHeatingEvents')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};
