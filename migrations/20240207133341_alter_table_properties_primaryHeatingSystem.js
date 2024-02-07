/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'properties';
const columnName = 'primaryHeatingSystem';

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        const previousValues = await knex(tableName).select('id', columnName);
        await knex.schema.alterTable(tableName, tbl => tbl.dropColumn(columnName));
        await knex.schema.alterTable(tableName, tbl => tbl.string(columnName));
        for(const val of previousValues){
            await knex(tableName).where({id: val.id}).update({
                [columnName]: val[columnName],
            });
        }

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
