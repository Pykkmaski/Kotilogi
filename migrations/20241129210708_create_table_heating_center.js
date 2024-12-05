/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('heating').createTable('heating_center', tbl => {
    tbl.uuid('heating_id').primary().references('id').inTable('heating.data');
    tbl.string('model', 32);
    tbl.string('brand', 32);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('heating').dropTable('heating_center');
};
