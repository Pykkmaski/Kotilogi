/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('drainage_ditches')
    .dropTableIfExists('restoration_event')
    .alterTable('data', tbl => {
      tbl.dropColumn('event_id');
      tbl
        .uuid('property_id')
        .primary()
        .references('id')
        .inTable('property.overview')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('drainage_ditches').alterTable('data', tbl => {
    tbl.uuid('event_id');
    tbl.dropColumn('id');
    tbl.dropColumn('property_id');
  });
};
