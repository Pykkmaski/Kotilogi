/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'properties';
const columnName = 'owner';

exports.up = function(knex) {
    return new Promise(async (resolve, reject) => {
        try{
            await knex.schema.alterTable(tableName, tbl => {
                tbl.dropForeign('owner');
                tbl.foreign(columnName).references('email').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
            })
        }
        catch(err){
            console.log(err.message);
        }
        finally{
            resolve();
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return new Promise(async (resolve, reject) => {
        try{
            await knex.schema.alterTable(tableName, tbl => {
                tbl.dropForeign('email');
                tbl.foreign('owner').references('username').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
            })
        }
        catch(err){
            console.log(err.message);
        }
        finally{
            resolve();
        }
   });
};
