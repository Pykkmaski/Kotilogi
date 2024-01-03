/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'usage';
const columnName = 'time';

exports.up = function(knex) {
    return new Promise(async (resolve, reject) => {
        try{
            const previousValues = await knex(tableName).select(columnName, 'id');
            await knex.schema.alterTable(tableName, tbl => tbl.dropColumn(columnName));
            await knex.schema.alterTable(tableName, tbl => {
                tbl.string(columnName);
            });

            for(const value of previousValues){
                await knex(tableName).where({id: value.id}).update(value);
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
            const previousValues = await knex(tableName).select(columnName, 'id');
            await knex.schema.alterTable(tableName, tbl => tbl.dropColumn(columnName));
            await knex.schema.alterTable(tableName, tbl => {
                tbl.bigint(columnName);
            });

            for(const value of previousValues){
                await knex(tableName).where({id: value.id}).update({
                    time: parseInt(value.time),
                });
            }

            resolve();
        }
        catch(err){
            reject(err);
        }
    })
};
