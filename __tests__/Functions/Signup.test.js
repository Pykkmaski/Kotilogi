const Signup = require('../../Functions/Signup');
const {req, res} = require('express');
const {getUserByEmail} = require('../../models/database');

jest.mock('../../Functions/Util/VerifyPassword');
jest.mock('../../models/database');

describe('Testing the signup function', () => {

    it('Rejects attempt to sign up with existing email', async () => {
        req.body = {
            email: 'Test'
        }
        getUserByEmail.mockResolvedValueOnce(true);
        const status = await Signup(req, res);
        expect(status).toBe(406); 
    });

    it('Responds with 500 on internal server error', async () => {
        getUserByEmail.mockRejectedValueOnce(new Error('Test: internal server error'));
        const status = await Signup(req, res);
        expect(status).toBe(500);
    });
})