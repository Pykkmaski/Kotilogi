/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw('ALTER TABLE public.?? SET SCHEMA drainage_ditches', [
    'ref_drainageDitchMethods',
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw('ALTER TABLE drainage_ditches.?? SET SCHEMA public', [
    'ref_drainageDitchMethods',
  ]);
};
