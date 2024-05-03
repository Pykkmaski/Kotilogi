/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('propertyEvents', tbl => {
    tbl.foreign('createdBy', 'FK_EVENTS').references('email').inTable('users').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table('propertyEvents', tbl => {
    tbl.dropForeign('createdBy', 'FK_EVENTS');
  });
};
