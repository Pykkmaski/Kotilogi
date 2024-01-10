/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'properties';
const columnName = 'hasGarage';

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        const previousValuesAsBooleans = await knex(tableName).select('hasGarage', 'id');
        await knex.schema.alterTable(tableName, tbl => tbl.string(columnName).alter());
        for(const value of previousValuesAsBooleans){
            await knex(tableName).where({id: value.id}).update({
                hasGarage: value.hasGarage ? 'Kyllä' : 'Ei',
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
  return new Promise(async (resolve, reject) => {
    try{
        const previousValuesAsStrings = await knex(tableName).select('hasGarage', 'id');
        await knex.schema.alterTable(tableName, tbl => {
            tbl.boolean(columnName);
        });

        for(const value of previousValuesAsStrings){
            await knex(tableName).where({id: value.id}).update({
                hasGarage: value.hasGarage === 'Kyllä' ? true : false
            });
        }

        resolve();
    }
    catch(err){
        reject(err);
    }
  });
};
