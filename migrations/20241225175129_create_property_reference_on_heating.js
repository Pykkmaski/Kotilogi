/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('heating').alterTable('data', tbl => {
    tbl
      .foreign('property_id')
      .references('id')
      .inTable('property.overview')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('heating').alterTable('data', tbl => {
    tbl.dropForeign('property_id');
  });
};
