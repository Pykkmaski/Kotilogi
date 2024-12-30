/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE property."transferCodes" RENAME TO property_transfer_code')
    .raw(
      'ALTER TABLE property.property_transfer_code RENAME CONSTRAINT "data_propertyTransferCodes_pkey" TO property_transfer_code_pkey'
    )
    .raw('ALTER TABLE property.property_transfer_code SET SCHEMA public');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema

    .raw('ALTER TABLE property_transfer_code RENAME TO "transferCodes"')
    .raw('ALTER TABLE "transferCodes" SET SCHEMA property');
};
