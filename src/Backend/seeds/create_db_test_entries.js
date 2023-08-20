/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


const usersTableName = 'users';
const propertiesTableName = 'properties';
const eventsTableName = 'property_events';

const testUserEmail = 'test@test.com';

const testUser = {
  email: testUserEmail,
  userName: testUserEmail,
  password: '$2b$15$NbFhFvdGp4dRaDT060gHveu0It4t6Swiby1CF2xIjlSTwIzsR/dEC',
  first_name: 'test',
  last_name: 'test',
}

const testProperty = {
  owner: testUser.email,
}

exports.seed = async function(knex) {
  await knex.raw('PRAGMA foreign_keys=ON');
  await knex('users').where({email: testUser.email}).del();

  await knex(usersTableName).insert(testUser);
  const tp = (await knex(propertiesTableName).insert(testProperty, '*')).at(0);
  await knex(eventsTableName).insert({
    property_id: tp.id,
    name: 'TestEvent',
  });
};
