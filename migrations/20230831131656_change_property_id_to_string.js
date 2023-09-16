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
            const oldIds = await knex(tableName).select('id');

            //Remove constraints
            await knex.schema.alterTable(tableName, tbl => {
                tbl.dropPrimary();
            });

            //Create a new column
            await knex.schema.alterTable(tableName, tbl => {
                tbl.string('new_id').primary('PK_PROPERTIES').unique().notNullable().defaultTo(knex.fn.uuid());
            });

            //Copy data
            for(const value of oldIds){
                await knex(tableName).where({id: value.id}).update({
                    new_id: value.id.toString(),
                });
            }

            //Drop the old column
            await knex.schema.alterTable(tableName, tbl => {
                tbl.dropColumn(columnName);
            })
            .
            //Rename the new column
            alterTable(tableName, tbl => {
                tbl.renameColumn('new_id', columnName);
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
exports.down = async function(knex) {
    return knex.schema.alterTable(tableName, tbl => {
        tbl.integer(columnName).alter();
    });
};
