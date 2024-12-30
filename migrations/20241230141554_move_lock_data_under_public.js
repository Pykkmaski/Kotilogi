/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE locking.data RENAME TO lock')
    .raw('ALTER TABLE locking.lock RENAME CONSTRAINT data_pkey TO lock_pkey')
    .raw('ALTER TABLE locking.lock SET SCHEMA public')
    .raw('DROP SCHEMA locking');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('CREATE SCHEMA locking')
    .raw('ALTER TABLE lock RENAME TO data')
    .raw('ALTER TABLE data SET SCHEMA locking')
    .raw('ALTER TABLE locking.data RENAME CONSTRAINT lock_pkey TO data_pkey');
};
