/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//Alter the plan column to be regular, pro or trial.

const tablename = 'users';

exports.up = function(knex) {
  return new Promise(async (resolve, reject) => {
    try{
        const oldPlanValues = await knex('users').select('email', 'plan');
        await knex.schema.alterTable(tablename, tbl => {
            tbl.dropColumn('plan');
        });

        await knex.schema.alterTable(tablename, tbl => {
            tbl.string('plan').checkIn(['regular', 'pro', 'trial']);
        });

        for(const value of oldPlanValues){
            await knex(tablename).where({email: value.email}).update({
                plan: value.plan
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
