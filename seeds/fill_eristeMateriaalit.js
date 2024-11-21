/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const types = [
    'Kivivilla',
    'Lasivilla',
    'Polyuretaanivaahto',
    'Selluvilla',
    'Puu- ja sellukuitueristeet',
    'Ekovilla',
    'Muu',
    'Puhallusvilla',
    'Vaahtomuovi',
  ];

  for (const t of types) {
    await knex('ref_eristeMateriaalit')
      .insert({
        label: t,
      })
      .onConflict('label')
      .ignore();
  }
};
