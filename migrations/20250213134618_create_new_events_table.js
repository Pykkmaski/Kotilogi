/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('new_events', tbl => {
    tbl
      .uuid('id')
      .primary()
      .references('id')
      .inTable('object')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl
      .uuid('property_id')
      .notNullable()
      .references('id')
      .inTable('property')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('title');
    tbl.string('description');
    tbl.string('event_type', 32);
    tbl.string('target_type', 32);
    tbl.float('material_expenses').defaultTo(0);
    tbl.float('labour_expenses').defaultTo(0);
    tbl.date('date');
    tbl.jsonb('data');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('new_events');
};
