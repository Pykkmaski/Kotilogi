/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/**
 * Create a table for usage data
 * id           - Id for the data entry, string.
 * refId        - Id of the property this data belongs to, string.
 * timestamps   - Timestamps for when the data was created and updated.
 * type         - Type of the data, string.
 */

const tableName = 'usage';
const usageTypes = ['electric', 'water', 'heat'];

exports.up = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    tbl.string('id').primary('PK_USAGE_ID').unique().defaultTo(knex.fn.uuid());
    tbl.string('refId').notNullable().comment('The id of the property this data belongs to.');
    tbl.foreign('refId', 'FK_PROPERTY_ID').references('id').inTable('properties').onUpdate('CASCADE').onDelete('CASCADE');
    
    tbl.string('type').checkIn(usageTypes).notNullable();
    tbl.timestamps(true, true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
