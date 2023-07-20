/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const migrationConfig = require('../migrationconfig');

const tableName = 'energy_usage';
const typeColumnName = 'type';
const priceColumnName = 'price';
const timeColumnName = 'time';
const propertyIdColumnName = 'property_id';

exports.up = function(knex) {
  return knex.schema.dropTableIfExists(energyUsageTableName).createTable(migrationConfig.tableNames.usage, tbl => {
    tbl.string('type');
    tbl.float('price').defaultTo(0);
    tbl.bigInteger('time').defaultTo(new Date().getTime());
    tbl.integer('property_id').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usage').createTable('energy_usage', tbl => {
        tbl.float('price').defaultTo(0);
        tbl.bigInteger('time').defaultTo(new Date().getTime());
        tbl.integer('property_id').notNullable();
    });
};
