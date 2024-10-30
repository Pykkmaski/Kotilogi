/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'ref_surfaces';
const surfaces = ['Katto', 'Seinät', 'Lattia'];

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await Promise.all(
    surfaces.map(s =>
      knex(table)
        .insert({
          label: s,
        })
        .onConflict('label')
        .ignore()
    )
  );
};