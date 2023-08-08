const request = require('supertest');
const server = require('../../server');
const db = require('../../dbconfig');

jest.unmock('express');
jest.unmock('../../models/database');
jest.mock('../../Functions/Util/VerifyPassword');

describe('Testing the server login route', () => {
    const testedRoute = '/api/login';

    const testUser = {
        first_name: 'test_first_name',
        last_name: 'test_last_name',
        email: 'Test',
        password: 'pass',
        active: false,
    }

    beforeAll(async () => {
        //Save a test user onto the database.
        await db('users').insert(testUser);
    });

    afterAll(async () => {
        //Delete the test user from the database.
        await db('users').where({email: testUser.email}).del();
    });

    it('Responds with 404 when a user does not exist', async () => {
        const response  = await request(server).post(testedRoute).send({email: 'nonexistent'});
        expect(response.statusCode).toBe(404);
    });

    it('Responds with 401 when provided password is incorrect', async () => {
        return request(server)
        .post(testedRoute)
        .send({email: testUser.email, password: 'incorrect'})
        .expect(401);
    });

    it('Responds with a payload containing user data when email and password is correct', async () => {
        const response = await request(server).post(testedRoute).send({email: testUser.email, password: testUser.password});
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.email).toEqual(testUser.email);
        expect(data.token).toBeDefined();
    });
});