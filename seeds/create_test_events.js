/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const refId = '10ee90c1-3c2b-4835-8f59-22c8213cbe4b';

exports.seed = async function (knex) {
  for (i = 0; i < 100; ++i) {
    const event = {
      refId,
      title: `Testitapahtuma ${i + 1}`,
      description: `Tapahtuma testitarkoituksiin.`,
      time: new Date().toLocaleDateString('fi-FI'),
      createdBy: 'jens.osterberg@gmail.com',
    };

    await knex('propertyEvents').insert(event);
  }
};
