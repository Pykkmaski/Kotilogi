/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
      ALTER TABLE events.data RENAME COLUMN "mainTypeId" TO event_type_id;
      ALTER TABLE events.data RENAME COLUMN "materialExpenses" TO material_expenses;
      ALTER TABLE events.data RENAME COLUMN "labourExpenses" TO labour_expenses;
      ALTER TABLE events.data RENAME COLUMN "targetId" TO target_id;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
    ALTER TABLE events.data RENAME COLUMN event_type_id TO "mainTypeId";
    ALTER TABLE events.data RENAME COLUMN material_expenses TO "materialExpenses";
    ALTER TABLE events.data RENAME COLUMN labour_expenses TO "labourExpenses";
    ALTER TABLE events.data RENAME COLUMN target_id TO "targetId";
  `);
};
