/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('buildings').alterTable('data', tbl => {
    tbl.integer('color_id');
    tbl
      .foreign('color_id', 'fk_color_id')
      .references('id')
      .inTable('ref_mainColors')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('buildings').alterTable('data', tbl => {
    tbl.dropColumn('color_id');
  });
};
