/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

async function dropForeignReference(knex, tablename, constraintName, schema = 'public') {
  await knex.schema.withSchema(schema).alterTable(tablename, tbl => {
    tbl.dropForeign(constraintName);
  });
}

/**Changes the specified column to varchar. */
async function changeTypeToString(knex, tablename, column, schema = 'public') {
  await knex.schema.withSchema(schema).alterTable(tablename, tbl => {
    tbl.string(column, 32).alter();
  });
}

/**Updates all values in a specific column, in the specified table. With the label-column from refTableName.*/
async function updateValueInColumnWithLabel(knex, trx, columnToUpdate, tablename, refTableName) {
  const stream = trx(tablename).join(
    knex
      .raw('?? on ??.id = CAST(? as INTEGER)', [
        refTableName,
        refTableName,
        `${tablename}.${columnToUpdate}`,
      ])
      .select(`${tablename}.id`, `${refTableName}.label as target_type`)
  );

  const promises = [];
  for await (const entry of stream) {
    promises.push(
      trx(tablename)
        .where({ id: entry.id })
        .update({
          [columnToUpdate]: entry.target_type,
        })
    );
  }

  await Promise.all(promises);
}

async function addForeign(knex, tablename, refTableName, column, refColumn, schema = 'public') {
  await knex.schema.withSchema(schema).alterTable(tablename, tbl => {
    tbl.foreign(column).references(refColumn).inTable(refTableName).onUpdate('CASCADE');
  });
}

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      //Drop the target_type_id foreign reference from events.
      await knex.schema.raw('ALTER TABLE event DROP CONSTRAINT target_type_id_fkey');

      //Change the event target_type_id-columns to varchar.
      await changeTypeToString(knex, 'event', 'target_id');

      //Change the target_type_id-columns to the corresponding label.
      const eventStream = trx('event')
        .join(knex.raw('types.event_target_type as tt on tt.id = CAST(event.target_id as INTEGER)'))
        .select('event.id', 'tt.label as target_type')
        .stream();

      const promises = [];
      for await (const event of eventStream) {
        promises.push(
          trx('event').where({ id: event.id }).update({ target_id: event.target_type })
        );
      }
      await Promise.all(promises);
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
exports.down = function (knex) {};
