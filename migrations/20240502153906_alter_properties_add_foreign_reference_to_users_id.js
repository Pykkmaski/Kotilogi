/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      const stream = trx('users').select('email', 'id').stream();
      for await (user of stream) {
        //Replace the current refId with the id of the user.
        const { id, email } = user;
        await trx('properties').where({ refId: email }).update({ refId: id });
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
    const trx = await knex.transaction();
    try {
      const stream = trx('users').select('email', 'id').stream();
      for await (user of stream) {
        //Replace the current refId with the email of the user.
        const { id, email } = user;
        await trx('properties').where({ refId: id }).update({ refId: email });
      }

      await trx.commit();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
