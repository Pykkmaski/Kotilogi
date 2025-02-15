const { Await } = require('react-router-dom');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable('data_utilities', tbl => {
      tbl
        .uuid('property_id')
        .references('id')
        .inTable('property')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .then(async () => {
      //Move the utility parentIds into the data_utility table.
      const trx = await knex.transaction();
      const stream = trx('data_utilities').select('id').stream();
      for await (const u of stream) {
        //Get the parentId from the corresponding object.
        const obj = await trx('object').where({ id: u.id }).select('parentId').first();
        if (obj) {
          await trx('data_utilities').where({ id: u.id }).update({
            property_id: obj.parentId,
          });
        }
      }

      await trx.commit();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
