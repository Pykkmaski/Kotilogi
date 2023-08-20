const req = require('supertest');
const server = require('../../../server');
const CreateLoginPayload = require('../../../Functions/Util/CreateLoginPayload');
const db = require('../../../dbconfig');

jest.unmock('express');
jest.unmock('../../../dbconfig');

var user, testEvent, testProperty;

beforeAll(async () => {
    user = await CreateLoginPayload('test@test.com', 'pass');
    testProperty = await db('properties').where({owner: user.email}).first();
    testEvent = await db('property_events').where({property_id: testProperty.id}).first();
});

it('Properly updates the entry', async () => {
    const newData = testEvent;
    newData.date = new Date();

    const res = await req(server).put('/api/events/' + testEvent.id)
    .set({
        Authorization: user.token,
    })
    .send(newData);

    expect(res.statusCode).toBe(200);
    
    //Update the test event to match its updated version
    const updatedEvent = testEvent = await db('property_events').where({id: testEvent.id}).first();
    expect(updatedEvent).toEqual(newData); 
});

it('Fails when token is invalid', async () => {
    await req(server).put('/api/events' + testEvent.id)
    .set({
        Authorization: 'Bearer token',
    })
    .expect(403);
});