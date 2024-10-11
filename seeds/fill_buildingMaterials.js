/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_buildingMaterials';
const buildingMaterials = ['Puu', 'Betoni', 'Hirsi', 'Muu'];

exports.seed = async function (knex) {
  for (const material of buildingMaterials) {
    await knex(table)
      .insert({
        name: material,
      })
      .onConflict('name')
      .ignore();
  }
};
