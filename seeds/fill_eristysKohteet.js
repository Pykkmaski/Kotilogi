/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const types = ['Seinät', 'Katon välipohja'];

  for (const t of types) {
    await knex('ref_eristeKohde')
      .insert({
        label: t,
      })
      .onConflict('label')
      .ignore();
  }
};
