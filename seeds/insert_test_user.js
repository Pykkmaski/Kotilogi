/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');
const tableName = 'users';
const testUserEmail = 'testUser@app.com';

exports.seed = async function(knex) {
  await knex(tableName).where({email: testUserEmail}).del();
  await knex(tableName).insert({
    first_name: 'Test',
    last_name: 'User',
    email: testUserEmail,
    username: 'testUser',
    password: await bcrypt.hash('pass', 15),
    active: 1,
  });
};
