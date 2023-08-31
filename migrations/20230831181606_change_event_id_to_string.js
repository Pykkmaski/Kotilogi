/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const crypto = require('crypto');

const tableName = 'property_events';
const columnName = 'id';
const secondaryColumnName = 'property_id';
const referencedTableName = 'properties';

exports.up = async function(knex) {
    return new Promise(async (resolve, reject) => {
        try{
            const previousValues = await knex(tableName);
            //Convert ids to strings
            for(const value of previousValues){
                value.id = value.id.toString();
                value.property_id = value.property_id.toString();
            }

            //Drop the current id column and property id column
            await knex.schema.alterTable(tableName, tbl => {
                tbl.dropColumn(columnName);
                tbl.dropColumn(secondaryColumnName);
            });

            //Create a new id and referenced id columns using strings as values
            await knex.schema.alterTable(tableName, tbl => {
                tbl.string(columnName).primary().unique();
                tbl.string(secondaryColumnName)
                .references(columnName)
                .inTable(referencedTableName)
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            });

            //Repopulate the new string ids
            for(const value of previousValues){
                const query = {...value};
                delete query.id;
                delete query.property_id;

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
            const newPropertyId = parseInt(value.property_id);

            const max = 0xfffffffff;

            if(isNaN(newId)){
                
                value.id = crypto.randomInt(max);
            }
            else{
                value.id = newId;
            }

            if(isNaN(newPropertyId)){
                value.property_id = crypto.randomInt(max);
            }
            else {
                value.property_id = newPropertyId;
            }
        }

        //Drop id columns
        await knex.schema.alterTable(tableName, tbl => {
            tbl.dropColumn(columnName);
            tbl.dropColumn(secondaryColumnName);
        });

        //Create new id columns with integer values
        await knex.schema.alterTable(tableName, tbl => {
            tbl.integer(columnName).primary().unique();
            tbl.integer(secondaryColumnName)
            .references(columnName)
            .inTable(referencedTableName)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        });

        //Populate the new ids
        for(const value of previousValues){
            const query = {...value};
            delete query.id;
            delete query.property_id;

            await knex(tableName).where(query).update(value);
        }
    }
    catch(err){
        reject(err);
    }

    resolve();
   })
};
