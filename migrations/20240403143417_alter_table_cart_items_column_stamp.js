/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'cartItems';
const columnname = 'stamp';

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        const oldValues = await knex(tablename).select('id', 'stamp');
        await knex.schema.alterTable(tablename, tbl => {
            tbl.dropColumn(columnname);
        })
        .alterTable(tablename, tbl => {
            tbl.string(columnname).checkIn(['add_property', 'reactivate_property']);
        });

        //Insert the old values
        for(const value of oldValues){
            await knex(tablename).where({id: value.id}).update({
                stamp: value.stamp,
            })
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
  return Promise.resolve();
};
