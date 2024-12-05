const { rejects } = require('assert');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const trx = await knex.transaction();
      const stream = trx('property.overview')
        .select(
          'id as property_id',
          'roomCount as room_count',
          'floorCount as floor_count',
          'wcCount as bathroom_count',
          'livingArea as living_area',
          'otherArea as other_area'
        )
        .stream();

      for await (const row of stream) {
        await trx('property.interior').insert(row);
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
      const stream = trx('property.interior')
        .select(
          'property_id',
          'room_count as roomCount',
          'floor_count as floorCount',
          'bathroom_count as wcCount',
          'living_area as livingArea',
          'other_area as otherArea'
        )
        .stream();

      for await (const row of stream) {
        const { property_id, ...rest } = row;
        await trx('property.overview').where({ id: property_id }).update(rest);
      }

      await trx.commit();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
