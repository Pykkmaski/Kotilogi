/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      //Drop the types.event_type id-column primary key, and make the label the primary key.
      await knex.schema
        .withSchema('types')
        .alterTable('event_type', tbl => {
          tbl.dropPrimary('ref_mainEventTypes_pkey');
        })
        .alterTable('event_type', tbl => {
          tbl.primary('label');
        });

      //Change the type of the event_type_id-column to varchar(32)
      await knex.schema.alterTable('event', tbl => {
        tbl.string('event_type_id', 32).alter();
      });

      //Set event types to null that do not exist in the event types
      await trx('event')
        .where(knex.raw('CAST(event_type_id AS INTEGER) NOT IN (SELECT id FROM types.event_type)'))
        .update({
          event_type_id: null,
        });

      //Change the event_type_id values in event to the labels.
      const eventStream = trx('event')
        .join(knex.raw('types.event_type as et on et.id = CAST(event.event_type_id AS INTEGER)'))
        .where(
          knex.raw(
            'event_type_id IS NOT NULL AND CAST(event_type_id AS INTEGER) IN (SELECT id FROM types.event_type)'
          )
        )
        .select(['event.id', 'event_type_id', 'et.label as event_type'])
        .stream();

      const eventAlterPromises = [];
      for await (const event of eventStream) {
        eventAlterPromises.push(
          trx('event').where({ id: event.id }).update({
            event_type_id: event.event_type,
          })
        );
      }
      await Promise.all(eventAlterPromises);

      //Add a foreign reference to the label in the event event_type_id column.
      await knex.schema.alterTable('event', tbl => {
        tbl
          .foreign('event_type_id')
          .references('label')
          .inTable('types.event_type')
          .onUpdate('CASCADE');
      });

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
    try {
      await knex.schema
        .withSchema('types')
        .alterTable('event_type', tbl => {
          tbl.dropPrimary();
        })
        .alterTable('event_type', tbl => {
          tbl.primary('id');
        });

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
