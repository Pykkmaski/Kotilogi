/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'data_propertyEvents';

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      //Create the new date-column.
      await knex.schema.alterTable(table, tbl =>
        tbl.date('date').notNullable().defaultTo(knex.raw('CURRENT_DATE'))
      );

      //Move the start-time of each existing event into the date-column.
      const stream = await knex(table).select('id', 'startTime').stream();
      for await (const e of stream) {
        const date = new Date(parseInt(e.startTime));
        const dateStr = `
          ${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
          date.getDate()
        ).padStart(2, '0')}
        `;
        await knex(table).where({ id: e.id }).update({
          date: dateStr,
        });
      }

      await knex.schema.alterTable(table, tbl => {
        tbl.dropColumn('startTime');
        tbl.dropColumn('endTime');
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
      //Create the old startTime and endTime columns.
      await knex.schema.alterTable(table, tbl => {
        tbl.bigint('startTime').notNullable().defaultTo(0);
        tbl.bigint('endTime');
      });

      //Move the start-time of each existing event into the date-column.
      const stream = await knex(table).select('id', 'date').stream();
      for await (const e of stream) {
        const timestamp = new Date(e.date).getTime();

        await knex(table).where({ id: e.id }).update({
          startTime: timestamp,
        });
      }

      await knex.schema.alterTable(table, tbl => {
        tbl.dropColumn('date');
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
