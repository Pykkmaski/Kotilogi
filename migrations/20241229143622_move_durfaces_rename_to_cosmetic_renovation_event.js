/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createSchema('cosmetic_renovation_events').then(async () => {
    await knex.schema.raw(`
      ALTER TABLE data_surfaces RENAME TO surfaces;
      ALTER TABLE surfaces SET SCHEMA cosmetic_renovation_events;
      `);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw(
      `ALTER TABLE cosmetic_renovation_events.surfaces RENAME TO data_surfaces;
      ALTER TABLE cosmetic_renovation_events.data_surfaces SET SCHEMA public;`
    )
    .dropSchema('cosmetic_renovation_events');
};
