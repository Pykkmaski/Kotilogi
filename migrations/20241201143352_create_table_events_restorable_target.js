/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('events').createTable('restorable_target_type', tbl => {
    tbl
      .integer('target_id')
      .primary()
      .references('id')
      .inTable('events.targets')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('events').dropTable('restorable_target_type');
};
