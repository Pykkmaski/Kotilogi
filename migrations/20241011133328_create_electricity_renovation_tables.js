/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const mainTable = 'data_electricityEvents';
const jobTargetsTable = 'ref_electricityJobTargets';

exports.up = function (knex) {
  return knex.schema
    .createTable(jobTargetsTable, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable(mainTable, tbl => {
      tbl
        .uuid('id')
        .primary()
        .references('id')
        .inTable('data_propertyEvents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('jobTargetId').references('id').inTable(jobTargetsTable).onUpdate('CASCADE');
      tbl.string('model', 32);
      tbl.string('brand', 32);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(mainTable).dropTableIfExists(jobTargetsTable);
};
