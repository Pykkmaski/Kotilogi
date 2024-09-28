/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('ref_eventTargets').del();
  const targets = ['Hormi', 'Lämmitys', 'Ikkunat', 'Katto', 'Julkisivu'];
  const promises = targets.map(t =>
    knex('ref_eventTargets').insert({
      label: t,
    })
  );
  await Promise.all(promises);
};
