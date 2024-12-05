/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('roofs')
    .createTableLike('restoration_history', 'overview', tbl => {
      tbl.dropPrimary();

      tbl
        .uuid('event_id')
        .primary()
        .references('id')
        .inTable('events.data')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      tbl
        .foreign('property_id')
        .references('id')
        .inTable('property.overview')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .raw('ALTER TABLE roofs.restoration_history ALTER COLUMN property_id SET NOT NULL');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('roofs').dropTable('restoration_history');
};
