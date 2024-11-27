/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('drainage_ditches')
    .renameTable('ref_drainageDitchMethods', 'implementation_methods');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('drainage_ditches')
    .renameTable('implementation_methods', 'ref_drainageDitchMethods');
};
