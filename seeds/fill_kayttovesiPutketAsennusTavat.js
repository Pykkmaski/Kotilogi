/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const types = ['Piiloasennus', 'Pinta-asennus'];

  for (const t of types) {
    await knex('ref_kayttovesiPutketAsennusTavat')
      .insert({
        label: t,
      })
      .onConflict('label')
      .ignore();
  }
};
