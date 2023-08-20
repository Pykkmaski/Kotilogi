const req = require('supertest');
const server = require('../../../server');
const db = require('../../../dbconfig');
const CreateLoginPayload = require('../../../Functions/Util/CreateLoginPayload');

var testProperty;
var user;

jest.unmock('express');
jest.unmock('../../../dbconfig');

beforeEach(async () => {
    user = await CreateLoginPayload('test@test.com', 'pass');
    testProperty = await db('properties').where({owner: user.email}).first();
}, 10000);

it('Responds with code 200 and deletes the property when password is correct', async () => {
    const tempProperty = await db('properties').where({id: testProperty.id}).first();
    expect(tempProperty).toBeDefined();

    const res = await req(server).delete('/api/properties/' + testProperty.id)
    .set({
        Authorization: user.token,
    })
    .send({
        password: 'pass',
    })
    
    expect(res.statusCode).toBe(200);

    const tempPropertyAfterDeletion = await db('properties').where({id: testProperty.id}).first();
    expect(tempPropertyAfterDeletion).toBeUndefined();
});

it('Fails when providing incorrect password', async () => {
    const tempProperty = await db('properties').where({id: testProperty.id}).first();
    expect(tempProperty).toBeDefined();

    await req(server).delete('/api/properties/' + testProperty.id)
    .set({
        Authorization: user.token,
    })
    .send({
        password: 'pass1',
    })
    .expect(403);
},10000);

