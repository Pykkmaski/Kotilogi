const request = require('supertest');
const server = require('../../server');
const db = require('../../dbconfig');
jest.unmock('express');
jest.mock('../../Functions/Util/VerifyPassword');

var user;

async function createTestUser(){
    const testUser = {
        first_name: 'test',
        last_name: 'test',
        email: 'test',
        username: 'test',
        password: 'pass'
    }

    await db('users').insert(testUser);
}

async function createTestProperty(){
    const testProperty = {
        owner: 'test'
    }

    return (await db('properties').insert(testProperty, 'id'))[0].id;
}

async function deleteTestUser(){
    await db('users').where({email: 'test'}).del();
}

async function deleteTestProperty(id){
    await db('properties').where({id}).del();
}

async function setAuthorizationHeader(token){
    request(server).set({'Authorization': 'Bearer ' + token});
}

beforeAll(async () => {
    await createTestUser();
    user = await request(server).post('/api/login').send({email: 'test', password: 'pass'});
    expect(user).toBeDefined();
});

afterAll(async () => {
    await deleteTestUser();
});

describe('Testing property fetching', () => {
    var property_id;

    beforeAll(async () => {
        property_id = await createTestProperty();
    });

    afterAll(async () => {
        await deleteTestProperty(property_id);
    });

    it('Responds with 404 when a property is not found', async () => {
        const response = await request(server)
        .get('/api/properties/' + property_id).send(user)
        .set('Authorization', `Bearer ${user.token}`);

        expect(response.statusCode).toBe(404);
    });
})