/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_buildingTypes';

const buildingTypes = [
  'Omakotitalo',
  'Kerrostalo',
  'Paritalo',
  'Puutalo-osake',
  'Rivitalo',
  'Erillistalo',
  'Luhtitalo',
  'Muu',
];

exports.seed = async function (knex) {
  for (const type of buildingTypes) {
    await knex(table)
      .insert({
        name: type,
      })
      .onConflict('name')
      .ignore();
  }
};
