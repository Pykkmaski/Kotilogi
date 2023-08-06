const SendActivationCode = require('../Functions/Util/SendActivationCode');
const {getUserByEmail} = require('../models/database');

jest.mock('../models/database');

describe('Testing activation code sender function', () => {
    it('Rejects if user is not found', async () => {
        getUserByEmail.mockImplementationOnce(() => Promise.resolve(undefined));
        await expect(SendActivationCode('test', null)).rejects.toThrow('404');
    });

    it('Rejects when a user is already active', async () => {
        getUserByEmail.mockImplementationOnce(() => Promise.resolve({active: true}));
        await expect(SendActivationCode('test', null)).rejects.toThrow('409');
    });
})