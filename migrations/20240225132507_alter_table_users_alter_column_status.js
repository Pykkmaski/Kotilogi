/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tablename = 'users';
const columnname = 'status';
const statuses = [
    'unconfirmed',
    'active',
    'inactive',
    'unpaid',
    'trial_expired'
];

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        const oldValues = await knex(tablename).select('email', 'status');
        await knex.schema.alterTable(tablename, tbl => {
            tbl.dropColumn(columnname);
        });

        await knex.schema.alterTable(tablename, tbl => {
            tbl.string(columnname).checkIn(statuses).notNullable().defaultTo('unconfirmed');
        });

        for(const value of oldValues){
            const newStatus = value.status === 'pending' ? 'unconfirmed' : value.status;
            await knex(tablename).where({email: value.email}).update({
                status: newStatus,
            });
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
  
};
