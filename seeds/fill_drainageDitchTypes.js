/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const types = ['Patolevy', 'Isodränlevy', 'Routaeristys', 'Suodatinkangas', 'Pumppukaivo'];

const table = 'ref_drainageDitchTypes';
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(table).del();
  for (const type of types) {
    await knex(table).insert({
      label: type,
    });
  }
};
