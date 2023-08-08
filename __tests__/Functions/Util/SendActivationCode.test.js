const SendActivationCode = require('../../../Functions/Util/SendActivationCode');
const {getUserByEmail} = require('../../../models/database');

jest.mock('../../../models/database');

describe('Testing activation code sender function', () => {
    it('Rejects if user is not found', () => {
        getUserByEmail.mockResolvedValueOnce(undefined);
        expect(SendActivationCode('test', null)).rejects.toThrow('404');
    });

    it('Rejects when a user is already active', () => {
        getUserByEmail.mockResolvedValueOnce({active: true});
        expect(SendActivationCode('test', null)).rejects.toThrow('409');
    });

    afterAll(() => {
        jest.clearAllMocks();
     });
})