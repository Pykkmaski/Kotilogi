/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('new_events', tbl => {
    tbl.uuid('id').primary().defaultTo(knex.fn.uuid());
    tbl
      .uuid('property_id')
      .notNullable()
      .references('id')
      .inTable('property')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.uuid('author_id').notNullable().references('id').inTable('data_users');
    tbl.string('title', 64);
    tbl.string('description');
    tbl.string('event_type', 32);
    tbl.string('target_type', 32);
    tbl.float('material_expenses');
    tbl.float('labour_expenses');
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
