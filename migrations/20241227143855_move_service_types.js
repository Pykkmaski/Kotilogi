/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createSchema('service_types')
    .raw('ALTER TABLE types.drainage_ditch_service_type SET SCHEMA service_types')
    .raw('ALTER TABLE types.insulation_service_type SET SCHEMA service_types')
    .raw('ALTER TABLE types.roof_service_type SET SCHEMA service_types')
    .raw('ALTER TABLE types.electricity_service_type SET SCHEMA service_types')
    .raw('ALTER TABLE types.structure_service_type SET SCHEMA service_types')
    .raw('ALTER TABLE types.heating_service_type SET SCHEMA service_types')
    .raw('ALTER TABLE types.water_pipe_service_type SET SCHEMA service_types')
    .raw('ALTER TABLE types.sewer_pipe_service_type SET SCHEMA service_types')
    .raw('ALTER TABLE types.ventilation_service_type SET SCHEMA service_types');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('ALTER TABLE service_types.drainage_ditch_service_type SET SCHEMA types')
    .raw('ALTER TABLE service_types.insulation_service_type SET SCHEMA types')
    .raw('ALTER TABLE service_types.roof_service_type SET SCHEMA types')
    .raw('ALTER TABLE service_types.electricity_service_type SET SCHEMA types')
    .raw('ALTER TABLE service_types.structure_service_type SET SCHEMA types')
    .raw('ALTER TABLE service_types.heating_service_type SET SCHEMA types')
    .raw('ALTER TABLE service_types.water_pipe_service_type SET SCHEMA types')
    .raw('ALTER TABLE service_types.sewer_pipe_service_type SET SCHEMA types')
    .raw('ALTER TABLE service_types.ventilation_service_type SET SCHEMA types')
    .dropSchemaIfExists('service_types');
};
