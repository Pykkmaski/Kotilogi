/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
      ALTER TABLE heating.data RENAME TO heating;
      ALTER TABLE heating.heating SET SCHEMA public;
    `).raw(`
        ALTER TABLE heating.oil_vessel SET SCHEMA public;
      `).raw(`
       ALTER TABLE heating.heating_center SET SCHEMA public;
        `).raw(`
          ALTER TABLE heating.warm_water_reservoir SET SCHEMA public;
          `).raw(`
              ALTER TABLE heating.primary_heating SET SCHEMA public;
            `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
    ALTER TABLE heating RENAME TO data;
    ALTER TABLE data SET SCHEMA heating;
  `).raw(`
      ALTER TABLE oil_vessel SET SCHEMA heating;
    `).raw(`
     ALTER TABLE heating_center SET SCHEMA heating;
      `).raw(`
        ALTER TABLE warm_water_reservoir SET SCHEMA heating;
        `).raw(`
          ALTER TABLE primary_heating SET SCHEMA heating;
          `);
};
