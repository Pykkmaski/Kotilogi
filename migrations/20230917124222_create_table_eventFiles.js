/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'eventFiles';

exports.up = function(knex) {
  /**
   * Table for containing info about files to be associated with an event.
   * id           - The uuid of the file, string.
   * refId        - Reference to the event id, string.
   * title        - A title for the file, string.
   * description  - A description for the file, string.
   * fileName     - Name of the file, string.
   * createdAt    - Timestamp for when the file was created.
   * updatedAt
   */

  return knex.schema.createTable(tableName, tbl => {
    tbl.string('id').primary('PK_EVENT_FILES_ID').unique().notNullable().defaultTo(knex.fn.uuid());
    tbl.string('refId').notNullable().comment('The id of the event this file is associated with.');
    tbl.foreign('refId', 'FK_EVENT_ID').references('id').inTable('propertyEvents').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.string('title', 50);
    tbl.text('description');
    tbl.string('fileName').notNullable();
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
