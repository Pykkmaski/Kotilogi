const Signup = require('../../Functions/Signup');
const {req, res} = require('express');
const db = require('../../dbconfig');

jest.mock('../../Functions/Util/VerifyPassword');
jest.mock('../../dbconfig');

describe('Testing the signup function', () => {

    it('Rejects attempt to sign up with existing email', async () => {
        req.body = {
            email: 'Test'
        }
        db().first.mockResolvedValueOnce(true);
        const status = await Signup(req, res);
        expect(status).toBe(406); 
    });

    it('Responds with 500 on internal server error', async () => {
        db().first.mockRejectedValueOnce(new Error('Test: internal server error'));
        const status = await Signup(req, res);
        expect(status).toBe(500);
    });
})