/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const types = [
    'event',
    'property',
    'roof',
    'oil_vessel',
    'warm_water_reservoir',
    'drainage_ditch',
    'heating_system',
    'file',
    'utility_record',
  ];

  const trx = await knex.transaction();
  try {
    for (const type of types) {
      await trx('objects.types').insert({ label: type }).onConflict('label').ignore();
    }

    await trx.commit();
  } catch (err) {
    await trx.rollback();
  }
};
