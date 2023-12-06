/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'propertyFiles';

exports.up = function(knex) {
    return knex.schema.createTable(tableName, tbl => {
        tbl.string('id').notNullable().primary('PK_PROPERTY_FILES').defaultTo(knex.fn.uuid()).unique();
        tbl.string('refId')
        .comment('The id of the target owning the file')
        .notNullable()
        .references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE');

        tbl.string('mimeType').notNullable().checkIn(['image/jpeg', 'application/jpeg']);
        tbl.string('fileName', 100).notNullable();
        tbl.string('title');
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
