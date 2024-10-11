/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const trx = await knex.transaction();
  try {
    const table = 'ref_heatingTypes';

    const propertyTypes = ['Kaukolämpö', 'Sähkö', 'Öljy', 'Maalämpö', 'Takka', 'Pelletti', 'Muu'];

    await Promise.all(
      propertyTypes.map(type => trx(table).insert({ name: type }).onConflict('name').ignore())
    );
    await trx.commit();
  } catch (err) {
    console.log(err.message);
    await trx.rollback();
  }
};
