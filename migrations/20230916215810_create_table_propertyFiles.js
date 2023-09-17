/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'propertyFiles';

exports.up = function(knex) {
  /**
   * Table for containing info about files to be associated with a property
   * id         - The uuid of the image, string.
   * refId      - Reference to the property id, string.
   * fileName   - Name of the file, string.
   * createdAt  - Timestamp for when the file was created.
   */

  return knex.schema.createTable(tableName, tbl => {
    tbl.string('id').primary('PK_PROPERTY_FILES_ID').unique().notNullable().defaultTo(knex.fn.uuid());
    tbl.string('refId').notNullable();
    tbl.foreign('refId', 'FK_PROPERTY_ID').references('id').inTable('properties').onUpdate('CASCADE').onDelete('CASCADE');
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
