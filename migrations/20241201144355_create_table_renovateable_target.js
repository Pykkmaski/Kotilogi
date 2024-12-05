/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('events')
    .createTableLike('renovateable_target_type', 'restorable_target_type', tbl => {
      //tbl.primary('target_id');
      tbl.foreign('target_id').references('id').inTable('events.targets').onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('events').dropTable('renovateable_target_type');
};
