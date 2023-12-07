/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'eventFiles';
const mimeTypes = ['image/jpeg', 'application/pdf'];

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        const oldMimeTypes = await knex(tableName).select('mimeType', 'id');

        //Drop the old column
        await knex.schema.alterTable(tableName, tbl => {
            tbl.dropColumn('mimeType');
        });

        //Create a new column with the correct mime type constraints.
        await knex.schema.alterTable(tableName, tbl => {
            tbl.string('mimeType').checkIn(mimeTypes);
        });

        //Insert the mime types back.
        for(const val of oldMimeTypes){
            await knex(tableName).where({id: val.id}).update({
                mimeType: val.mimeType,
            });
        }

        resolve();
    }
    catch(err){
        reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
