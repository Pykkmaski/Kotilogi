/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_mainEventTypes';
const mainEventTypes = ['Peruskorjaus', 'Huoltotyö', 'Pintaremontti', 'Uusi rakennus', 'Muu'];

exports.seed = async function (knex) {
  for (const type of mainEventTypes) {
    await knex(table)
      .insert({
        label: type,
      })
      .onConflict('label')
      .ignore();
  }
};
