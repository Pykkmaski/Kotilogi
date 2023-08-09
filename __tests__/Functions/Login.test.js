const {req,  res} = require('express');
const VerifyPassword = require('../../Functions/Util/VerifyPassword');
const {getUserByEmail} = require('../../models/database');
const Login = require('../../Functions/Login');
const CreateToken = require('../../Functions/Util/CreateToken');

/*
const res = express.response;
const req = express.request;

jest.mock('express');

jest.spyOn(res, 'sendStatus').mockImplementation((status) => status);
jest.spyOn(res, 'status').mockReturnThis();
jest.spyOn(res, 'send').mockImplementation((data) => data);

*/

jest.mock('../../Functions/Util/VerifyPassword');
jest.mock('../../Functions/Util/CreateToken');
jest.mock('../../models/database');

describe('Testing the login function', () => {

    beforeEach(() => {
        req.body = {
            email: 'Test',
            password: 'pass'
        }
    });

    it('Fails when providing an unregistered email', async () => {
        getUserByEmail.mockResolvedValue(undefined);

        /*
        CreateLoginPayload should throw a 404 error inside Login, which gets handled by RouteHandleError, where res.sendStatus 
        has been mocked to return the status back, which is checked like a regular return value.
        */
        const status = await Login(req, res);
        expect(status).toBe(404);
    });

    it('Fails when providing an incorrect password', async () => {
        getUserByEmail.mockResolvedValue(true);
        VerifyPassword.mockResolvedValue(false);
        const status = await Login(req, res);
        expect(status).toBe(401);
    });

    it('Responds with 500 on internal server error', async () => {
        getUserByEmail.mockRejectedValueOnce(new Error('Test: internal server error'));
        const status = await Login(req, res);
        expect(status).toBe(500);
    });

    it('Succeeds on existing user', async () => {
        getUserByEmail.mockResolvedValue({email : 'Test', active: true});
        VerifyPassword.mockResolvedValue(true);
        CreateToken.mockImplementation(() => 'token');

        const payload = await Login(req, res);
        expect(typeof(payload)).toEqual('object');
        expect(payload.email).toEqual('Test');
        expect(payload.token).toEqual('Bearer token');
    });

    afterAll(() => {
        jest.clearAllMocks();
     });
})