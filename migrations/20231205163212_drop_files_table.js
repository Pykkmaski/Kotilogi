/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.dropTableIfExists('files');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return new Promise(async (resolve, reject) => {
        try{
            //Move content from propertyFiles and eventFiles into the new files table.
            await knex.schema.createTable('files', tbl => {
                tbl.string('id').unique().notNullable().defaultTo(knex.fn.uuid());
                tbl.string('refId').notNullable();
                tbl.string('mimeType').notNullable().checkIn(['image/jpeg', 'application/pdf']);
                tbl.string('fileName').notNullable();
                tbl.string('title');
                tbl.text('description');
                tbl.timestamps(true, true, true);
            });

            resolve();
        }
        catch(err){
            reject(err);
        }
    });
};
