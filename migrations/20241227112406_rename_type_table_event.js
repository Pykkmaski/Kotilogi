/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('types')
    .renameTable('event', 'event_type')
    .renameTable('roof', 'roof_type')
    .renameTable('building', 'building_type')
    .renameTable('energy_class', 'energy_class_type')
    .renameTable('yard_ownership', 'yard_ownership_type')
    .renameTable('heating', 'heating_type')
    .renameTable('lock', 'lock_type')
    .renameTable('property', 'property_type')
    .renameTable('object', 'object_type');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('types')
    .renameTable('event_type', 'event')
    .renameTable('roof_type', 'roof')
    .renameTable('building_type', 'building')
    .renameTable('energy_class_type', 'energy_class')
    .renameTable('yard_ownership_type', 'yard_ownership')
    .renameTable('heating_type', 'heating')
    .renameTable('lock_type', 'lock')
    .renameTable('property_type', 'property')
    .renameTable('object_type', 'object');
};
