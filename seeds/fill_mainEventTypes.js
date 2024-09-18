/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_mainEventTypes';

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(table).del();
  const types = ['Peruskorjaus', 'Pintaremontti', 'Huoltotyö'];
  const promises = types.map(type => knex(table).insert({ name: type }));
  await Promise.all(promises);
};
