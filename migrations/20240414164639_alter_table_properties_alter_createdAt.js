/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'properties';
const columnName = 'createdAt';
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      const oldValues = await knex(tablename).select(columnName, 'id');
      await knex.schema
        .alterTable(tablename, tbl => {
          tbl.dropColumn(columnName);
        })
        .alterTable(tablename, tbl => {
          tbl.bigint(columnName);
        });

      for (const value of oldValues) {
        await knex(tablename)
          .where({ id: value.id })
          .update({
            [columnName]: new Date(value[columnName]).getTime(),
          });
      }

      await knex.schema.alterTable(tablename, tbl => {
        tbl.bigint(columnName).notNullable().alter();
      });

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
      //const oldValues = await knex(tablename).select(columnName, 'id');
      await knex.schema.alterTable(tablename, tbl => {
        tbl.timestamp(columnName).alter();
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
