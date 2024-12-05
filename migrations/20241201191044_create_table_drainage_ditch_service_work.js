/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('drainage_ditches').createTable('service_work', tbl => {
    tbl.uuid('event_id').primary();
    tbl
      .integer('service_work_type_id')
      .notNullable()
      .references('id')
      .inTable('drainage_ditches.service_work_type')
      .onUpdate('CASCADE');

    tbl
      .foreign('event_id')
      .references('id')
      .inTable('events.data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('drainage_ditches').dropTable('service_work');
};
