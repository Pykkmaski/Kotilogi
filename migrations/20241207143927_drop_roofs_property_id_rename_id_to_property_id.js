/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('roofs').alterTable('overview', tbl => {
    tbl.dropColumn('property_id');
    tbl.renameColumn('id', 'property_id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('roofs').alterTable('overview', tbl => {
    tbl.renameColumn('property_id', 'id');
    tbl
      .uuid('property_id')
      .references('id')
      .inTable('property.overview')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};
