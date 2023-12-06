/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return new Promise(async (resolve, reject) => {
        try{
            const eventIds = await knex('propertyEvents').pluck('id');
            if(eventIds.length === 0) return resolve();

            const eventFiles = await knex('files').whereIn('refId', eventIds);

            if(eventFiles.length === 0) return resolve();
            
            await knex('eventFiles').insert(eventFiles);
            await knex('files').whereIn('refId', eventIds).del();
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
            const eventFiles = await knex('eventFiles');
            if(eventFiles.length === 0) return resolve();
            
            await knex('files').insert(eventFiles);
            await knex('eventFiles').del();
            resolve();
        }
        catch(err){
            reject(err);
        }
    })
};
