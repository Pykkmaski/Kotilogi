/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(
    `ALTER TABLE "data_electricHeatingEvents" SET SCHEMA heating;
    ALTER TABLE heating."data_electricHeatingEvents" RENAME TO electric_heating_restoration_work;
    ALTER TABLE heating.electric_heating_restoration_work RENAME COLUMN "methodId" TO restoration_method_id;`
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(
    `
    ALTER TABLE heating.electric_heating_restoration_work RENAME TO "data_electricHeatingEvents";
    ALTER TABLE heating."data_electricHeatingEvents" RENAME COLUMN restoration_method_id TO "methodId";
    ALTER TABLE heating."data_electricHeatingEvents" SET SCHEMA public;
    `
  );
};
