/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const types = ['Sukitus', 'Uusiminen'];

  for (const t of types) {
    await knex('ref_viemariPutketToteutusTapa')
      .insert({
        label: t,
      })
      .onConflict('label')
      .ignore();
  }
};
