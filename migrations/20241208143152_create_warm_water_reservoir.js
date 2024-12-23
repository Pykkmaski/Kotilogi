/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('heating').createTable('warm_water_reservoir', tbl => {
    tbl
      .uuid('heating_id')
      .notNullable()
      .references('id')
      .inTable('heating.data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.float('volume', 8, 2);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('heating').dropTable('warm_water_reservoir');
};
