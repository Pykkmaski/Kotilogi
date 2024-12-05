/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(
    `ALTER TABLE ?? SET SCHEMA heating;
    ALTER TABLE heating.?? RENAME TO electric_heating_method_type;`,
    ['ref_electricHeatingMethodTypes', 'ref_electricHeatingMethodTypes']
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(
    `
      ALTER TABLE heating.electric_heating_method_type SET SCHEMA public;
      ALTER TABLE public.electric_heating_method_type RENAME TO ??
    `,
    ['ref_electricHeatingMethodTypes']
  );
};
