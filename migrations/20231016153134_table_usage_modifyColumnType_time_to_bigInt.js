/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const columnName = 'time';
const tableName = 'usage';

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        const previousValues = await knex(tableName).select('id', columnName);
        await knex.schema.alterTable(tableName, tbl => {
            tbl.dropColumn(columnName);
        });

        await knex.schema.alterTable(tableName, tbl => {
            tbl.bigint(columnName);
        });

        previousValues.forEach(async (entry) => {
            await knex(tableName).where({id: entry.id}).update({
                [columnName] : entry[columnName]
            });
        });

        resolve();
    }
    catch(err){
        console.log(err.message);
        reject();
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
            const previousValues = await knex(tableName).select('id', columnName);
            await knex.schema.alterTable(tableName, tbl => {
                tbl.dropColumn(columnName);
            });
    
            await knex.schema.alterTable(tableName, tbl => {
                tbl.integer(columnName);
            });
    
            previousValues.forEach(async (entry) => {
                await knex(tableName).where({id: entry.id}).update({
                    [columnName] : entry[columnName]
                });
            });
    
            resolve();
        }
        catch(err){
            console.log(err.message);
            reject();
        }
    });
};
