/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(
    `ALTER TABLE ref_surfaces RENAME to surface_type; ALTER TABLE surface_type SET SCHEMA types;`
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(
    `
    ALTER TABLE types.surface_type RENAME TO ref_surfaces; 
    ALTER TABLE types.ref_surfaces SET SCHEMA public;`
  );
};
