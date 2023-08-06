const SendPasswordResetCode = require('../Functions/Util/SendPasswordResetCode');
const {getUserByEmail} = require('../models/database');

jest.mock('../models/database');

describe('Testing SendPasswordResetCode function', () => {
    it('Rejects when a user does not exist', async () => {
        getUserByEmail.mockImplementation(() => Promise.resolve(undefined));
        await expect(SendPasswordResetCode('test')).rejects.toThrow('404');
    });
});