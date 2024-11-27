/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('roofs.data', tbl => {
    tbl
      .uuid('property_id')
      .references('id')
      .inTable('properties.base')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('roofs.data', tbl => tbl.dropColumn('property_id'));
};
