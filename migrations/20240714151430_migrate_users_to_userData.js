//User migration file

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const oldTable = 'users';
const newTable = 'userData';

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      //Stream through the old users, and add them to the new users table.
      const stream = await trx(oldTable).stream();
      for await (const user of stream) {
        const { status, email, password } = user;

        await trx(newTable).insert({
          email,
          password,
          status:
            status === 'active' ? 0 : status === 'unconfirmed' ? 1 : status === 'inactive' ? 2 : -1,
        });
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
  return Promise.resolve();
};
