/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('buildings').createTable('data', tbl => {
    tbl.uuid('id').defaultTo(knex.fn.uuid());

    tbl
      .uuid('property_id')
      .notNullable()
      .references('id')
      .inTable('properties.base')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.integer('build_year');

    tbl.integer('building_type_id').references('id').inTable('buildings.types').onUpdate('CASCADE');
    tbl
      .integer('building_material_id')
      .references('id')
      .inTable('buildings.materials')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('buildings').dropTable('data');
};
