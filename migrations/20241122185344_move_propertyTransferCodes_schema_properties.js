/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE public.?? SET SCHEMA properties', ['data_propertyTransferCodes'])
    .renameTable('properties.data_propertyTransferCodes', 'transferCodes');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .renameTable('properties.transferCodes', 'data_propertyTransferCodes')
    .raw('ALTER TABLE properties.?? SET SCHEMA public', ['transferCodes']);
};
