/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'users';
const statuses = ['active', 'pending', 'inactive'];
exports.up = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    /**
     * Create a user table with columns for
     * email      - The email address of the user. Must be unique and primary.
     * password   - The password for the user, hashed with bcrypt.
     * status     - The status of the user, string.
     */
    tbl.string('email').primary('PK_USERS_EMAIL').unique().notNullable();
    tbl.string('password').notNullable();
    tbl.string('status').checkIn(statuses).defaultTo('pending');

    tbl.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
