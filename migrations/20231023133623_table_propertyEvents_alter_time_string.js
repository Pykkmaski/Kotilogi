/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'propertyEvents';
const columnName = 'time';

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        //Save the old column values
        const oldValues = await knex(tableName).select(columnName, 'id');

        //Delete the old column
        await knex.schema.alterTable(tableName, tbl => tbl.dropColumn(columnName));
        //Create a new column
        await knex.schema.alterTable(tableName, tbl => tbl.string(columnName));

        //Save the old column values as strings
        oldValues.forEach(async (val) => {
            await knex(tableName).where({id: val.id}).update({time: val.time});
        });

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
    return new Promise(async (resolve, reject) => {
        try{
            //Save the old column values
            const oldValues = await knex(tableName).select(columnName, 'id');
    
            //Delete the old column
            await knex.schema.alterTable(tableName, tbl => tbl.dropColumn(columnName));
            //Create a new column
            await knex.schema.alterTable(tableName, tbl => tbl.bigint(columnName));
    
            //Save the old column values as ints.
            oldValues.forEach(async (val) => {
                await knex(tableName).where({id: val.id}).update({time: parseInt(val.time)});
            });
    
            resolve();
        }
        catch(err){
            reject(err);
        }
      });
};
