/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'files';

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        //Store the values of all tables.
        const propertyImages    = await knex('propertyImages');
        const eventImages       = await knex('eventImages');
        const propertyFiles     = await knex('propertyFiles');
        const eventFiles        = await knex('eventFiles');

        //Drop the old tables.
        await knex.schema.dropTableIfExists('propertyImages');
        await knex.schema.dropTableIfExists('eventImages');
        await knex.schema.dropTableIfExists('propertyFiles');
        await knex.schema.dropTableIfExists('eventFiles');

        //Create a new unified file table.
        await knex.schema.createTable(tableName, tbl => {
            tbl.string('id').notNullable().primary('PK_FILES').defaultTo(knex.fn.uuid()).unique();
            tbl.string('refId').comment('The id of the target owning the file').notNullable();
            tbl.string('mimeType').notNullable().checkIn(['image/jpeg', 'application/jpeg']);
            tbl.string('fileName', 100);
            tbl.string('title');
            tbl.text('description');
            tbl.timestamps(true, true, true);
        });

        //Set the mime type
        const imageMimeType = 'image/jpeg';
        const documentMimeType = 'application/pdf';

        propertyImages.forEach(item => item.mimeType = imageMimeType);
        eventImages.forEach(item => item.mimeType = imageMimeType);
        propertyFiles.forEach(item => item.mimeType = documentMimeType);
        eventFiles.forEach(item => item.mimeType = documentMimeType);

        //Populate the new files-table with the old entries.
        const combinedData = [...propertyImages, ...propertyFiles, ...eventImages, ...eventFiles];
        combinedData.forEach(async item => {
            //The new table does not have a title-column, so delete the title property from the item before inserting.
            if('title' in item) delete item.title;
            if(item.mimeType === null) item.mimeType = 'image/jpeg';
            
            await knex(tableName).insert(item);
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
exports.down = function(knex) {
  
};
