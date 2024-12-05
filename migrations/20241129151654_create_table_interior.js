/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('property').createTable('interior', tbl => {
    tbl
      .uuid('property_id')
      .primary()
      .references('id')
      .inTable('property.overview')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.integer('room_count');
    tbl.integer('floor_count').defaultTo(1);
    tbl.integer('bathroom_count');
    tbl.float('living_area', 8, 2);
    tbl.float('other_area', 8, 2);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('property').dropTable('interior');
};
