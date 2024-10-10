/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const types = ['Vesikiertoinen', 'Ilmalämmitteinen', 'Sähköpatteri'];

  for (const t of types) {
    await knex('ref_electricHeatingMethodTypes')
      .insert({
        label: t,
      })
      .onConflict('label')
      .ignore();
  }
};
