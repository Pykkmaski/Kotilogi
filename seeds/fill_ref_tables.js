/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const trx = await knex.transaction();
  try {
    const propertyTypes = ['PROPERTY', 'APPARTMENT'];
    await Promise.all(propertyTypes.map(type => trx('ref_propertyTypes').insert({ type })));

    const buildingTypes = [
      'HOUSE',
      'ROW_HOUSE',
      'APT',
      'ABA',
      'PAIR_HOUSE',
      'SEPT',
      'SHARE',
      'OTHER',
    ];

    await Promise.all(buildingTypes.map(type => trx('ref_buildingTypes').insert({ type })));

    const utilityTypes = ['HEAT', 'WATER', 'ELECTRIC'];

    await Promise.all(utilityTypes.map(type => trx('ref_utilityTypes').insert({ type })));

    const buildingMaterials = ['CONCRETE', 'WOOD', 'BRICK', 'LOG', 'OTHER'];

    await Promise.all(buildingMaterials.map(type => trx('ref_buildingMaterials').insert({ type })));

    const roofTypes = ['FLAT', 'GABLE', 'SHED', 'OTHER'];

    await Promise.all(roofTypes.map(type => trx('ref_roofTypes').insert({ type })));

    const roofMaterials = ['METAL', 'BRICK', 'SHEET', 'OTHER'];
    await Promise.all(roofMaterials.map(type => trx('ref_roofMaterials').insert({ type })));

    await trx.commit();
  } catch (err) {
    console.log(err.message);
    await trx.rollback();
  }
};
