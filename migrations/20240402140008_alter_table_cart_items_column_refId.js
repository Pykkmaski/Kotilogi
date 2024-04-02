/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'cartItems';
const columnname = 'refId';

exports.up = function(knex) {
    return new Promise(async (resolve, reject) => {
        try{
            await knex(tablename).del();
            
            await knex.schema.alterTable(tablename, tbl => {
                tbl.dropColumn(columnname);
            })
            .alterTable(tablename, tbl => {
                tbl.string(columnname).notNullable().references('id').inTable('properties').onDelete('CASCADE').onUpdate('CASCADE');
            });

            resolve();
        }
        catch(err){
            reject(err);
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
