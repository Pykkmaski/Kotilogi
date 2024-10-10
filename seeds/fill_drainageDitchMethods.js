/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const types = ['Isodränlevyt', 'Patolevyt'];
  for (const t of types) {
    await knex('ref_drainageDitchMethods')
      .insert({
        label: t,
      })
      .onConflict('label')
      .ignore();
  }
};
