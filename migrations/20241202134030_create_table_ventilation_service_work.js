/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('ventilation').createTable('service_work', tbl => {
    tbl.uuid('event_id').primary().references('id').inTable('events.data');
    tbl
      .integer('service_work_type_id')
      .notNullable()
      .references('id')
      .inTable('ventilation.service_work_type')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('ventilation').dropTable('service_work');
};
