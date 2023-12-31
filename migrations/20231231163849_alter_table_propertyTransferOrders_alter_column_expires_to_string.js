/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'propertyTransferOrders', columnName = 'expires';

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        const previousValues = await knex(tableName).select(columnName, 'id');
        await knex.schema.alterTable(tableName, tbl => {
            tbl.dropColumn(columnName);
        });

        await knex.schema.alterTable(tableName, tbl => {
            tbl.string(columnName).notNullable();
        });

        for(const value of previousValues){
            await knex(tableName).where({id: value.id}).update({
                expires: value.expires,
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
        /**Previous string values of the column. */
        const previousValues = await knex(tableName).select(columnName, 'id');
        await knex.schema.alterTable(tableName, tbl => {
            tbl.dropColumn(columnName);
        });

        await knex.schema.alterTable(tableName, tbl => {
            tbl.bigint(columnName).notNullable();
        });

        for(const value of previousValues){
            await knex(tableName).where({id: value.id}).update({
                expires: parseInt(value.expires),
            });
        }

        resolve();
        
    }
    catch(err){
        reject(err);
    }
  })
};
