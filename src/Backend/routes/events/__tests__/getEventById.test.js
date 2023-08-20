const req = require('supertest');
const db = require('../../../dbconfig');
const server = require('../../../server');
const CreateLoginPayload = require('../../../Functions/Util/CreateLoginPayload');

jest.unmock('express');
jest.unmock('../../../dbconfig');

var testProperty;
var user;
var testEvent;

beforeAll(async () => {
    user = await CreateLoginPayload('test@test.com', 'pass');
    testProperty = await db('properties').where({owner: user.email}).first();
    testEvent = await db('property_events').where({property_id: testProperty.id}).first();
});

it('Responds with 404 when an event does not exist', async () => {
    await req(server).get('/api/events/' + -1)
    .set({
        Authorization: user.token
    })
    .expect(404);
});

it('Responds with 200 and the event when it exist', async () => {

    const res = await req(server).get('/api/events/' + testEvent.id)
    .set({
        Authorization: user.token,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(testEvent)
});

it('Responds with 500 when an unexpected error occurs', async () => {
    jest.mock('../../../dbconfig');
    jest.spyOn(db, 'first').mockRejectedValueOnce(new Error('Unexpected Error'));
    await req(server).get('/api/events' + testEvent.id)
    .set({
        Authorization: user.token,
    })
    .expect(500);
});