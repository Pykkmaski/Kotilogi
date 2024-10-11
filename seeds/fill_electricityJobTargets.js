/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const types = [
    'Sähköjohdot',
    'Sähköpääkeskus',
    'Asennuskalusteet',
    'Sulakerasiat',
    'Sähkösaneeraus (Kaikki)',
  ];

  for (const t of types) {
    await knex('ref_electricityJobTargets')
      .insert({
        label: t,
      })
      .onConflict('label')
      .ignore();
  }
};
