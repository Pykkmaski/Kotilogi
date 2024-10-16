/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const types = [
    'Kivivilla',
    'Lasivilla',
    'Polystyreenivaahto (EPS ja XPS)',
    'Polyuretaanivaahto (PUR ja PIR)',
    'Selluvilla',
    'Puu- ja sellukuitueristeet',
    'Pellavaeriste',
    'Lampaanvilla',
    'Aerogeelieristeet',
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
