/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('service_events')
    .createTable('other_service_type', tbl => {
      tbl.increments('id');
      tbl.string('label', 32).notNullable().unique();
    })
    .createTable('other_service_event', tbl => {
      tbl
        .uuid('event_id')
        .primary()
        .references('id')
        .inTable('event')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('service_work_type_id')
        .notNullable()
        .references('id')
        .inTable('service_events.other_service_type')
        .onUpdate('CASCADE');
    })
    .then(async () => {
      await knex('service_events.other_service_type').insert([{ label: 'Muu' }]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('service_events')
    .dropTableIfExists('other_service_event')
    .dropTableIfExists('other_service_type');
};
