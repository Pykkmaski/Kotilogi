/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  const table = 'ref_mainEventTypes';
  await knex(table).del();
  const types = ['Peruskorjaus', 'Huoltotyö', 'Pintaremontti', 'Uusi rakennus', 'Muu'];
  const promises = types.map(type => knex(table).insert({ label: type }));
  await Promise.all(promises);
};
