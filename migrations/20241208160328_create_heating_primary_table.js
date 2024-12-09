/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('heating').createTable('primary_heating', tbl => {
    tbl
      .uuid('heating_id')
      .primary()
      .references('id')
      .inTable('heating.data')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .uuid('property_id')
      .notNullable()
      .references('id')
      .inTable('property.overview')
      .onDelete('CASCADE')
      .onDelete('CASCADE');
    tbl.unique(['heating_id', 'property_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('heating').dropTable('primary_heating');
};
