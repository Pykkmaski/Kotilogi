/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('bills', tbl => {
    tbl.dropColumn('refId');
  })
  .alterTable('bills', tbl => {
    tbl.string('targetId').notNullable().comment('The id of the target that the bill refers to.');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return Promise.resolve();
};
