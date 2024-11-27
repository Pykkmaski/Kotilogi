/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('heating').createTable('data', tbl => {
    tbl
      .uuid('id')
      .primary()
      .references('id')
      .inTable('objects.data')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .uuid('property_id')
      .notNullable()
      .references('id')
      .inTable('properties.base')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('heating_type_id')
      .notNullable()
      .references('id')
      .inTable('properties.heatingTypes')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('heating').dropTable('data');
};
