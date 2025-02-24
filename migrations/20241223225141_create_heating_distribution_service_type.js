/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const schema = 'heating';

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    await knex.schema
      .withSchema(schema)
      .createTable('distribution_service_work_type', tbl => {
        tbl.string('label', 32).unique().notNullable();
        tbl.increments('id');
      })
      .createTable('distribution_service_work', tbl => {
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
          .inTable(`${schema}.distribution_service_work_type`)
          .onUpdate('CASCADE');
      })
      .then(async () => {
        await knex(`${schema}.distribution_service_work_type`).insert({
          label: 'Muu',
        });
      })
      .catch(err => reject(err));
    resolve();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema(schema)
    .dropTable('distribution_service_work')
    .dropTable('distribution_service_work_type');
};
