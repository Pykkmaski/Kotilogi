/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE property.houses RENAME TO house')
    .raw('ALTER TABLE property.house RENAME CONSTRAINT "houseData_pkey" TO house_pkey')
    .raw('ALTER TABLE property.house SET SCHEMA public');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('ALTER TABLE house RENAME TO houses')
    .raw('ALTER TABLE houses SET SCHEMA property');
};
