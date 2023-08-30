const request = require('supertest');
const server = require('../../server');
const db = require('../../dbconfig');

jest.unmock('express');
jest.unmock('../../models/database');
jest.mock('../../Functions/Util/SendActivationCode');

describe('Testing the server signup route', () => {
    const testedRoute = '/api/signup';
    const testUser = {
        first_name: 'test_first_name',
        last_name: 'test_last_name',
        email: 'Test',
        password: 'pass',
        active: false,
    }

    beforeAll(async () => {
        await db('users').insert(testUser);
    });

    afterAll(async () => {
        await db('users').where({email: 'Test'}).del();
    });

    it('Responds with 406 when trying to register with an existing email', async () => {
        const data = {
            email: 'Test',
        }

        const response = await request(server).post(testedRoute).send(data);
        expect(response.statusCode).toBe(406);
    });

    it('Responds with 409 when sent passwords do not match', async () => {
        const data = {
            email: 'nonexistent',
            password1: 'pass1',
            password2: 'pass2',
        }

        const response = await request(server).post(testedRoute).send(data);
        expect(response.statusCode).toBe(409);
    });

    it('Responds with 200 on success and the database now contains the new user', async () => {
        const data = {
            email: 'test@gmail.com',
            password1: 'pass',
            password2: 'pass',
            first_name: 'test',
            last_name: 'test',
        }

        const response = await request(server).post(testedRoute).send(data);
        expect(response.statusCode).toBe(200);
        
        const databaseEntry = await db('users').where({email: data.email}).first();
        expect(databaseEntry).toBeDefined();

        //Clean up afterwards
        await db('users').where({email: data.email}).del();
    }, 12000);
});