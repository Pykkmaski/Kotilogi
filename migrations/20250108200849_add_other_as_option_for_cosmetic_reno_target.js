/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
      INSERT INTO cosmetic_renovation_events.cosmetic_renovation_target_type (target_id) VALUES (
        (SELECT id FROM types.event_target_type WHERE label = 'Muu')
      )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
      DELETE FROM cosmetic_renovation_events.cosmetic_renovation_target_type
      WHERE target_id = (SELECT id FROM types.event_target_type WHERE label = 'Muu')
    `);
};
