/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'bills';
const columnName = 'stamp';
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const oldBills = await knex('bills');
      await knex.schema
        .alterTable(tablename, tbl => {
          tbl.dropColumn(columnName);
        })
        .alterTable(tablename, tbl => {
          tbl
            .string(columnName)
            .checkIn(['property', 'event', 'usage', 'file', 'image', 'property_transfer']);
        });

      for (const bill of oldBills) {
        await knex('bills')
          .where({ id: bill.id })
          .update({
            ...bill,
            stamp: bill.stamp === 'add_property' ? 'property' : bill.stamp,
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
