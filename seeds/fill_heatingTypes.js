/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const trx = await knex.transaction();
  try {
    const table = 'ref_heatingTypes';
    await trx(table).del();
    const propertyTypes = [
      'Kaukolämpö',
      'Sähkö',
      'Öljy',
      'Ilmalämpöpumppu',
      'Vesi-ilmalämpöpumppu',
      'Maalämpö',
      'Takka',
      'Muu',
    ];
    await Promise.all(propertyTypes.map(type => trx(table).insert({ name: type })));
    await trx.commit();
  } catch (err) {
    console.log(err.message);
    await trx.rollback();
  }
};
