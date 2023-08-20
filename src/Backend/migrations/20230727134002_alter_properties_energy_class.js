/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const columnName = 'energy_class';
const tableName = 'properties';

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        const oldValues = await knex.select(columnName, 'id').from(tableName);

        await knex.schema.alterTable(tableName, tbl => {
            tbl.dropColumn(columnName);
        });

        await knex.schema.alterTable(tableName, tbl => {
            tbl.string(columnName, 10);
        });

    
        for(const val of oldValues){
            await knex(tableName).where({id: val.id}).update({energy_class: val.energy_class});
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
    return new Promise(async (resolve, reject) => {
        try{
            const oldValues = await knex.select(columnName, 'id').from(tableName);
            await knex.schema.alterTable(tableName, tbl => {
                tbl.dropColumn(columnName)
            });

            await knex.schema.alterTable(tableName, tbl => {
                tbl.string(columnName, 1);
            });
            
            for(const val of oldValues){
                if(val.energy_class.length == 1){
                    await knex(tableName).where({id: val.id}).update({energy_class: val.energy_class});
                }
            }
    
            resolve();
        }
        catch(err){
            reject(err);
        }
        
      });
};
