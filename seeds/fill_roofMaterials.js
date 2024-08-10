/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const trx = await knex.transaction();
  try {
    const table = 'ref_roofMaterials';
    await trx(table).del();
    const types = ['Pelti', 'Tiili', 'Huopa', 'Muu'];
    await Promise.all(types.map(type => trx(table).insert({ name: type })));
    await trx.commit();
  } catch (err) {
    console.log(err.message);
    await trx.rollback();
  }
};
