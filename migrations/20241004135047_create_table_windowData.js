/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_windows';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .uuid('eventId')
      .notNullable()
      .references('id')
      .inTable('data_propertyEvents')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.integer('roomId').references('id').inTable('ref_rooms').onUpdate('CASCADE');
    tbl.float('uvalue');
    tbl.float('minSoundproofing');
    tbl.float('maxSoundproofing');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
