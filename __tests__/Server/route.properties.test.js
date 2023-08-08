const request = require('supertest');
const server = require('../../server');
const db = require('../../dbconfig');
const { isDebuggerStatement } = require('typescript');
jest.unmock('express');
jest.mock('../../Functions/Util/VerifyPassword');

describe('Testing the properties route', () => {
    const testUser = {
        email: 'Test',
        username: 'Test',
        password: 'pass',
        first_name: 'test',
        last_name: 'test',
    }

    const testProperty = {
        owner: testUser.username,
    }

    var user;
    var headers = {};

    beforeAll(async () => {
        await db('users').insert(testUser);
        const response = await request(server).post('/api/login').send({email: 'Test', password: 'pass'});
        user = JSON.parse(response.text);

        expect(user.token).toBeDefined();
        headers.Authorization = user.token;

        const ids = await db('properties').insert(testProperty, 'id');
        testProperty.id = ids[0].id;
    });

    afterAll(async () => {
        await db('users').where({email: testUser.email}).del();
    });

    it('Responds with 404 if a property is not found', async () => {
        const response = await request(server).get('/api/properties/' + -1).set({
            'Authorization': user.token,
        });
        expect(response.statusCode).toBe(404);
    });

    it('Responds with code 200 and the property if it is found', async () => {
        expect(testProperty.id).toBeDefined();
        const response = await request(server).get('/api/properties/' + testProperty.id).set(headers);
        expect(response.statusCode).toBe(200);
    });
})