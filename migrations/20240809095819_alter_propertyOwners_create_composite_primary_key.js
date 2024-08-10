/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_propertyOwners';
const constraintName = 'PK_PROPERTY_OWNERS';

exports.up = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.dropPrimary('data_propertyOwners_pkey');
    tbl.primary(['userId', 'propertyId'], constraintName);
    tbl.dropColumn('id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(table, tbl => {
    tbl.dropPrimary('PK_PROPERTY_OWNERS');
    tbl.uuid('id').notNullable().defaultTo(knex.fn.uuid());
    tbl.primary('id', constraintName);
  });
};
