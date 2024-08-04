/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_userPlans';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl.increments('id');
    tbl
      .uuid('userId')
      .notNullable()
      .references('id')
      .inTable('data_users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('name', 20).notNullable();
    tbl.bigint('maxFileStorage').notNullable();
    tbl.bigint('price').defaultTo(0);
    tbl
      .integer('billingScheduleId')
      .notNullable()
      .references('ref_billingSchedules')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
