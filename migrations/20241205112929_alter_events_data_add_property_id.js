/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('events').alterTable('data', tbl => {
    tbl
      .uuid('property_id')
      .references('id')
      .inTable('property.overview')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('events').alterTable('data', tbl => {
    tbl.dropColumn('property_id');
  });
};
