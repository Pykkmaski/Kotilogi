/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'bills';
const columnname = 'stamp';

exports.up = function(knex) {
    return new Promise(async (resolve, reject) => {
        try{
            const oldValues = await knex(tablename).select('id', 'stamp');
            await knex.schema.alterTable(tablename, tbl => {
                tbl.dropColumn(columnname);
            })
            .alterTable(tablename, tbl => {
                tbl.string(columnname).checkIn(['add_property', 'activate_property', 'charge_property']);
            });

            for(const value of oldValues){
                if(value[columnname] === 'reactivate_property'){
                    value[columnname] = 'activate_property';
                }

                await knex(tablename).where({id: value.id}).update({
                    [columnname] : value[columnname],
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
  return Promise.resolve();
};
