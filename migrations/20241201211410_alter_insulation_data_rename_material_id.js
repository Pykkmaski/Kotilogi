/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(
    'ALTER TABLE insulation.data RENAME COLUMN "materiaaliId" TO insulation_material_id'
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(
    'ALTER TABLE insulation.data RENAME COLUMN insulation_material_id TO "materiaaliId'
  );
};
