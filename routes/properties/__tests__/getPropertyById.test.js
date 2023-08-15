const request = require('supertest');
const server = require('../../../server');
const db = require('../../../dbconfig');
const CreateLoginPayload = require('../../../Functions/Util/CreateLoginPayload');

jest.unmock('../../../dbconfig');
jest.unmock('express');

const testPropertyId = 178;
var user;
var testProperty;

beforeAll(async () => {
    user = await CreateLoginPayload('test@test.com', 'pass');
    testProperty = await db('properties').where({id: testPropertyId}).first();
});

it('Fails with response code 404 when the property is not found', async () => {
    const response = await request(server).get('/api/properties/' + -1)
    .set({
        Authorization: user.token,
    })
    expect(response.statusCode).toBe(404);
});

it('Fails with code 403 when the fetch does not include an authorization header', async () => {
    request(server)
    .get('/api/properties' + testPropertyId)
    .expect(403);
});

it('Fails with code 403 when the authorization header is of incorrect format', async () => {
    request(server)
    .get('/api/properties' + testPropertyId)
    .set({
        'Authorization': 'Bearer token',
    })
    .expect(403);
});

it('Succeeds with response code 200 when property is found', async () => {
    const response = await request(server).get('/api/properties/' + testPropertyId)
    .set({
        'Authorization': user.token,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(testProperty);
});
