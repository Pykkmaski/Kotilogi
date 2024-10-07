/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = 'ref_eventWorkTypes';
const workTypes = [
  'Nuohous',
  'Pinnoitus',
  'Asennus',
  'Vaihto',
  'Poisto',
  'Puhdistus',
  'Maalaus',
  'Tapetointi',
];

exports.seed = async function (knex) {
  for (const type of workTypes) {
    await knex(table)
      .insert({
        label: type,
      })
      .onConflict('label')
      .ignore();
  }
};
