/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const trx = await knex.transaction();
  try {
    const table = 'ref_roofTypes';
    await trx(table).del();
    const types = ['Peltikatto', 'Harjakatto', 'Pulpettikatto', 'Tasakatto', 'Muu'];
    await Promise.all(types.map(type => trx(table).insert({ name: type })));
    await trx.commit();
  } catch (err) {
    console.log(err.message);
    await trx.rollback();
  }
};
