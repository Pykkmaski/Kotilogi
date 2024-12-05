/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const trx = await knex.transaction();
      const stream = await trx('properties.base').select(
        'id',
        'buildingTypeId',
        'buildingMaterialId',
        'buildYear'
      );
      for await (const data of stream) {
        await trx('buildings.data').insert({
          property_id: data.id,
          building_type_id: data.buildingTypeId,
          building_material_id: data.buildingMaterialId,
          build_year: data.buildYear,
        });
      }
      await trx.commit();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const trx = await knex.transaction();
      const stream = await trx('buildings.data').select(
        'property_id',
        'building_type_id',
        'building_material_id',
        'build_year'
      );
      for await (const data of stream) {
        await trx('properties.base').where({ id: data.property_id }).insert({
          buildingTypeId: data.building_type_id,
          buildingMaterialId: data.building_material_id,
          buildYear: data.build_year,
        });
      }
      await trx.commit();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
