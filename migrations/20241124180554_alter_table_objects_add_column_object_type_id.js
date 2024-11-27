/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('objects.data_objects', tbl => {
    tbl.integer('object_type_id').references('id').inTable('objects.types').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('objects.data_objects', tbl => {
    tbl.dropColumn('object_type_id');
  });
};
