/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return new Promise(async (resolve, reject) => {
        try{
            const propertyIds = await knex('properties').pluck('id');
            if(propertyIds.length === 0) return resolve();

            const propertyFiles = await knex('files').whereIn('refId', propertyIds);
            if(propertyFiles.length === 0) return resolve();
            
            await knex('propertyFiles').insert(propertyFiles);
            await knex('files').whereIn('refId', propertyIds).del();
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
            const propertyFiles = await knex('propertyFiles');
            if(propertyFiles.length === 0) return resolve();
            
            await knex('files').insert(propertyFiles);
            await knex('propertyFiles').del();
            resolve();
        }
        catch(err){
            reject(err);
        }
    })
};
