/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'propertyTransferOrders';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    tbl.string('id').notNullable().defaultTo(knex.fn.uuid());
    tbl.string('propertyId').notNullable().references('id').inTable('properties').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.string('toOwner').notNullable().references('email').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.bigint('expires').notNullable();
    tbl.string('verificationCode').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
