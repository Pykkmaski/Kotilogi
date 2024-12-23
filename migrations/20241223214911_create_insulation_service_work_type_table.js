/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('insulation')
    .createTable('service_work_type', tbl => {
      tbl.string('label', 32).unique().notNullable();
      tbl.increments('id');
    })
    .createTable('service_work', tbl => {
      tbl
        .uuid('event_id')
        .primary()
        .references('id')
        .inTable('events.data')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('service_work_type_id')
        .notNullable()
        .references('id')
        .inTable('insulation.service_work_type')
        .onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('insulation')
    .dropTable('service_work')
    .dropTable('service_work_type');
};
