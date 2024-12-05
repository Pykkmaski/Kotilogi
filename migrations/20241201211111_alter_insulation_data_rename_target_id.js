/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(
    'ALTER TABLE insulation.data RENAME COLUMN "kohdeId" TO insulation_target_id'
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(
    'ALTER TABLE insulation.data RENAME COLUMN insulation_target_id TO "kohdeId"'
  );
};
