/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const drainageDitchTypes = [
  'Patolevy',
  'Isodränlevy',
  'Routaeristys',
  'Suodatinkangas',
  'Pumppukaivo',
];

const table = 'ref_drainageDitchTypes';
exports.seed = async function (knex) {
  for (const type of drainageDitchTypes) {
    await knex(table).insert({ label: type }).onConflict('label').ignore();
  }
};
