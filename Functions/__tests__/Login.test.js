const {req,  res} = require('express');
const VerifyPassword = require('../Util/VerifyPassword');
const db = require('../../dbconfig');
const Login = require('../Login');
const CreateToken = require('../Util/CreateToken');

jest.mock('../../Functions/Util/VerifyPassword');
jest.mock('../../Functions/Util/CreateToken');
jest.mock('../../dbconfig');

describe('Testing the login function', () => {

    beforeEach(() => {
        req.body = {
            email: 'Test',
            password: 'pass'
        }
    });

    it('Fails when providing an unregistered email', async () => {
        db.first.mockResolvedValueOnce(undefined);

        /*
        CreateLoginPayload should throw a 404 error inside Login, which gets handled by RouteHandleError, where res.sendStatus 
        has been mocked to return the status back, which is checked like a regular return value.
        */
        const status = await Login(req, res);
        expect(status).toBe(404);
    });

    it('Fails when providing an incorrect password', async () => {
        db.first.mockResolvedValueOnce(true);
        VerifyPassword.mockResolvedValue(false);
        const status = await Login(req, res);
        expect(status).toBe(401);
    });

    it('Responds with 500 on internal server error', async () => {
        db.first.mockRejectedValueOnce(new Error('Test: internal server error'));
        const status = await Login(req, res);
        expect(status).toBe(500);
    });

    it('Succeeds on existing user', async () => {
        db.first.mockResolvedValueOnce({email : 'Test', active: true});
        VerifyPassword.mockResolvedValue(true);
        CreateToken.mockImplementation(() => 'token');

        const payload = await Login(req, res);
        expect(typeof(payload)).toEqual('object');
        expect(payload.email).toEqual('Test');
        expect(payload.token).toEqual('Bearer token');
    });
})