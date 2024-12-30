/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE roofs.materials RENAME TO roof_material_type')
    .raw('ALTER TABLE roofs."ref_aluskatetyypit" RENAME TO roof_underlacing_type')
    .raw('ALTER TABLE roofs."ref_otsalautatyypit" RENAME TO roof_fascia_board_type')
    .raw('ALTER TABLE roofs."ref_raystastyypit" RENAME TO roof_eaves_type').raw(`
      ALTER TABLE roofs.roof_material_type SET SCHEMA types;
      ALTER TABLE roofs.roof_underlacing_type SET SCHEMA types;
      ALTER TABLE roofs.roof_fascia_board_type SET SCHEMA types;
      ALTER TABLE roofs.roof_eaves_type SET SCHEMA types;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
