/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable('data_files', tbl => {
      //tbl.dropForeign('id');
      tbl
        .uuid('parent_id')
        .references('id')
        .inTable('object')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .then(async () => {
      //Move the parent ids of each file-object into the files table
      const trx = await knex.transaction();
      const stream = trx('data_files').select('id').stream();
      for await (const f of stream) {
        //Get the object with the same id as the file, since that is how it was set up previously.
        const obj = await trx('object').where({ id: f.id }).select('parentId').first();
        try {
          //Set the parent id of the old object as the parent id of the file.
          await trx('data_files').where({ id: f.id }).update({
            parent_id: obj.parentId,
          });
        } catch (err) {
          console.log(f.id);
          throw err;
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
  return knex.schema.alterTable('data_files', tbl => {
    //tbl.foreign('id').references('id').inTable('object').onUpdate('CASCADE').onDelete('CASCADE');
    tbl.dropColumn('parent_id');
  });
};
