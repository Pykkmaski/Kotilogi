/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'propertyEvents';

exports.up = function(knex) {
    /**
     * Create a table containing events associated with a property.
     * id           - The id unique id of the table, string.
     * refId        - The id of the property the event belongs to, string.
     * mainImageId  - The id for the image to display on the event-cards, string.
     * title        - The event title, string.
     * description  - The event description, string.
     * createdAt    - The date the event was created, integer.
     * updatedAt    - The date the event was updated, integer.
     */
  return knex.schema.createTable(tableName, tbl => {
    tbl.string('id').unique().primary('PK_PROPERTY_EVENTS_ID').notNullable();
    tbl.string('refId').notNullable().comment('The id of the property the event belongs to.');
    tbl.foreign('refId', 'FK_PROPERTY_ID').references('id').inTable('properties').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.string('mainImageId');
    tbl.string('title', 50);
    tbl.text('description');
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
