/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_heatingSourceTypes';
const types = ['Kaukolämpö', 'Öljy', 'Maalämpö', 'Sähkö', 'Pelletti'];

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(table).del();
  for (const type of types) {
    await knex(table).insert({
      label: type,
    });
  }
};
