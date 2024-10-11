/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const types = ['Älylukko', 'Avainpesälukko'];

  for (const t of types) {
    await knex('ref_lockTypes')
      .insert({
        label: t,
      })
      .onConflict('label')
      .ignore();
  }
};
