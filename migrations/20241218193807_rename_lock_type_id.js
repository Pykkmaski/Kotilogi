/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('locking').alterTable('data', tbl => {
    tbl.renameColumn('lockTypeId', 'lock_type_id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('locking').alterTable('data', tbl => {
    tbl.renameColumn('lock_type_id', 'lockTypeId');
  });
};
