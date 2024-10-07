/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const eventTargets = [
  'Hormi',
  'Ikkunat',
  'Katto',
  'Julkisivu',
  'Keittiö',
  'WC',
  'Olohuone',
  'Makuuhuone',
  'Kodinhoitohuone',
  'Muu',
  'Salaojat',
  'Käyttövesiputket',
  'Viemäriputket',
  'Eristys',

  'Eteinen',
  'Savupiippu',
  'Vesikourut',
  'Huippuimuri',
];

exports.seed = async function (knex) {
  for (const target of eventTargets) {
    await knex('ref_eventTargets')
      .insert({
        label: target,
      })
      .onConflict('label')
      .ignore();
  }
};
