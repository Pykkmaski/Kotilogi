/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tables = [
  'ref_propertyTypes',
  'ref_buildingTypes',
  'ref_buildingMaterials',
  'ref_roofTypes',
  'ref_roofMaterials',
  'ref_yardOwnershipTypes',
  'ref_utilityTypes',
  'ref_energyClasses',
];

exports.up = function (knex) {
  return Promise.all(
    tables.map(table =>
      knex.schema.createTable(table, tbl => {
        tbl.string('label', 25).unique().primary().notNullable();
      })
    )
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all(tables.map(table => knex.schema.dropTableIfExists(table)));
};
