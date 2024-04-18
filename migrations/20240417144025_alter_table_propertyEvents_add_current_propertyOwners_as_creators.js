/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'propertyEvents';

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await knex(tablename).where({ createdBy: null });
      for await (const event of stream) {
        const [{ refId: owner }] = await knex('properties').where({ id: event.refId }).select('refId');
        await knex(tablename).where({ id: event.id }).update({
          createdBy: owner,
        });
      }

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
  return Promise.resolve();
};
