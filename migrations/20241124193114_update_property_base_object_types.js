/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      const stream = trx('properties.base').stream();
      for await (const { id } of stream) {
        //Update the object types
        await trx.raw(
          `
            UPDATE objects.data 
            SET object_type_id = (SELECT id FROM objects.types WHERE label = 'property' LIMIT 1)
            WHERE id = ?;
          `,
          [id]
        );
      }
      await trx.commit();
      resolve();
    } catch (err) {
      await trx.rollback();
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
    const trx = await knex.transaction();
    try {
      const stream = trx('properties.base').stream();
      for await (const { id } of stream) {
        await trx.raw(
          `
            UPDATE objects.data
            SET object_type_id = NULL
            WHERE id = ?;
          `,
          [id]
        );
      }
      await trx.commit();
      resolve();
    } catch (err) {
      await trx.rollback();
      reject(err);
    }
  });
};
