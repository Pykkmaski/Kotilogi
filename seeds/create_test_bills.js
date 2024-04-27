/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const customer = 'jens.osterberg@gmail.com';
  const [property] = await knex('properties').where({ refId: customer });

  const bill = {
    amount: 990,
    stamp: 'add_property',
    status: 'unpaid',
    customer,
    due: 1000,
    targetId: property.id,
  };

  await knex('bills').insert(bill);
};
