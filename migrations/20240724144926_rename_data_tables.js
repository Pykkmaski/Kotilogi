/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableNames = {
  objectData: 'data_objects',
  propertyData: 'data_properties',
  appartmentData: 'data_appartments',
  houseData: 'data_houses',
  utilityData: 'data_utilities',
  propertyOwnerData: 'data_propertyOwners',
  userData: 'data_users',
  fileData: 'data_files',
  propertyEventData: 'data_propertyEvents',
};

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    await Promise.all(
      Object.entries(tableNames).map(([key, value]) => knex.schema.renameTable(key, value))
    );
    resolve();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return new Promise(async (resolve, reject) => {
    await Promise.all(
      Object.entries(tableNames).map(([key, value]) => knex.schema.renameTable(value, key))
    );
    resolve();
  });
};
