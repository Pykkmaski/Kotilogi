/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('data_surfaces', tbl => {
    tbl
      .uuid('eventId')
      .notNullable()
      .references('id')
      .inTable('data_propertyEvents')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('data_surfaces', tbl => tbl.dropColumn('eventId'));
};
