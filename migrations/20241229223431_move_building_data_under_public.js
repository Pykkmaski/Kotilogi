/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
      ALTER TABLE buildings.data RENAME TO building;
      ALTER TABLE buildings.building SET SCHEMA public;

      ALTER TABLE buildings.materials RENAME TO building_material_type;
      ALTER TABLE buildings.building_material_type SET SCHEMA types;
      DROP SCHEMA buildings;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
    CREATE SCHEMA buildings;
    ALTER TABLE building RENAME TO data;
    ALTER TABLE data SET SCHEMA building;

    ALTER TABLE types.building_material_type RENAME TO materials;
    ALTER TABLE types.materials SET SCHEMA buildings;
  `);
};
