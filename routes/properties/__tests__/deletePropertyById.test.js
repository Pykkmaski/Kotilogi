const req = require('supertest');
const server = require('../../../server');
const db = require('../../../dbconfig');
const CreateLoginPayload = require('../../../Functions/Util/CreateLoginPayload');

var tempPropertyId;
var user;

jest.unmock('express');
jest.unmock('../../../dbconfig');

beforeAll(async () => {
    tempPropertyId = (await db('properties').insert({
        owner: 'test@test.com'
    }, 'id'))[0].id;

    user = await CreateLoginPayload('test@test.com', 'pass');
});

afterAll(async () => {
    await db('properties').where({id: tempPropertyId}).del();
});

it('Responds with code 200 and deletes the property', async () => {
    const tempProperty = await db('properties').where({id: tempPropertyId}).first();
    expect(tempProperty).toBeDefined();

    const res = await req(server).delete('/api/properties/' + tempPropertyId)
    .set({
        Authorization: user.token,
    });
    expect(res.statusCode).toBe(200);

    const tempPropertyAfterDeletion = await db('properties').where({id: tempPropertyId}).first();
    expect(tempPropertyAfterDeletion).toBeUndefined();
});

