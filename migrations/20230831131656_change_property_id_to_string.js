/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const crypto = require('crypto');

const tableName = 'properties';
const columnName = 'id';

exports.up = async function(knex) {
    return new Promise(async (resolve, reject) => {
        try{
            const previousValues = await knex(tableName);
            //Convert ids to strings
            for(const value of previousValues){
                value.id = value.id.toString();
            }

            //Drop the current id column
            await knex.schema.alterTable(tableName, tbl => {
                tbl.dropColumn(columnName);
            });

            //Create a new id column using strings as values
            await knex.schema.alterTable(tableName, tbl => {
                tbl.string(columnName).primary().unique();
            });

            //Repopulate the new string ids
            for(const value of previousValues){
                const query = {...value};
                delete query.id;
                await knex(tableName).where(query).update(value);
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
exports.down = async function(knex) {
   return new Promise(async (resolve, reject) => {
    try{
        const previousValues = await knex(tableName);

        //Drop the old id column
        await knex.schema.alterTable(tableName, tbl => {
            tbl.dropColumn(columnName);
        });

        //Convert the string ids back to numbers.
        for(const value of previousValues){
            const newId = parseInt(value.id);
            if(isNaN(newId)){
                const max = 0xfffffffff;
                value.id = crypto.randomInt(max);
            }
            else{
                value.id = newId;
            }
        }

        //Create new id column
        await knex.schema.alterTable(tableName, tbl => {
            tbl.dropColumn(columnName);
        });

        //Populate the new ids
        for(const value of previousValues){
            const query = {...value};
            delete query.id;
            await knex(tableName).where(query).update(value);
        }
    }
    catch(err){
        reject(err);
    }
   })
};
