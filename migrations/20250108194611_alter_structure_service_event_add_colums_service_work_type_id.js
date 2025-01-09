/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('service_events').alterTable('structure_service_event', tbl => {
    tbl.dropColumn('service_target_id');
    tbl
      .integer('service_work_type_id')
      .notNullable()
      .references('id')
      .inTable('service_events.structure_service_type')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('service_events').alterTable('structure_service_event', tbl => {
    tbl.dropColumn('service_work_type_id');
    tbl
      .integer('service_target_id')
      .notNullable()
      .references('id')
      .inTable('service_events.structure_service_target_type')
      .onUpdate('CASCADE');
  });
};
