/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const newTableName = 'files';
const propertyFilesTableName = 'property_files';
const eventFilesTableName = 'event_files';
const eventsTableName = 'property_events';
const propertiesTableName = 'properties';

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    //Create a new table for the values.
    await knex.schema.createTable(newTableName, tbl => {
        tbl.string('id').unique().primary();
        tbl.string('property_id')
        .notNullable()
        .references('id')
        .inTable(propertiesTableName)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        tbl.string('event_id')
        .nullable()
        .references('id')
        .inTable(eventsTableName)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        tbl.string('filename').notNullable();
        tbl.integer('created_at').defaultTo(new Date().getTime());
        

        resolve();
    })
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(newTableName);
};
