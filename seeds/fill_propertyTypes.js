/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const trx = await knex.transaction();
  try {
    await trx('ref_propertyTypes').del();
    const propertyTypes = ['Kiinteistö', 'Huoneisto'];
    await Promise.all(propertyTypes.map(type => trx('ref_propertyTypes').insert({ type })));
    await trx.commit();
  } catch (err) {
    console.log(err.message);
    await trx.rollback();
  }
};
