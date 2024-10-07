/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = 'ref_eventTargetCategories';
const targetCategories = ['Lämmitys', 'Sähkö', 'Ilmanvaihto', 'Muu'];

exports.seed = async function (knex) {
  for (const category of targetCategories) {
    await knex(table)
      .insert({
        label: category,
      })
      .onConflict('label')
      .ignore();
  }
};
