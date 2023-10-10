/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'editHistory';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, tbl => {
    tbl.string('id').unique().primary('PK_EDIT_HISTORY').notNullable().defaultTo(knex.fn.uuid());
    tbl.string('refId').notNullable().comment('The id of the target being referenced');
    tbl.string('columnName').notNullable();
    tbl.string('tableName').notNullable();
    tbl.string('previousValue').notNullable();
    tbl.string('currentValue').notNullable();
    tbl.text('editReason').notNullable();
    tbl.integer('timestamp').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
