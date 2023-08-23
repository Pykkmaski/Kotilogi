const VerifyResetCode = require('../VerifyResetCode');
const db = require('../../../dbconfig');
const VerifyPassword = require('../VerifyPassword');

jest.mock('../../../dbconfig');
jest.mock('../../../Functions/Util/VerifyPassword');

VerifyPassword.mockImplementation((a, b) => a === b);

describe('Testing the verifyResetCode function', () => {
    it('Rejects when no reset code exists', () => {
        db().first.mockResolvedValueOnce(undefined);
        expect(VerifyResetCode('code', 'email')).rejects.toThrow('404');
    });

    it('Rejects when the code does not match the encrypted code', () => {
        db().first.mockResolvedValueOnce({reset_code: 'code1'});
        expect(VerifyResetCode('code2', 'email')).rejects.toThrow('403');
    });

    it('Rejects when a code has expired', () => {
        db().first.mockResolvedValueOnce({
            reset_code: 'code',
            expires: 1,
        });
        expect(VerifyResetCode('code', 'email')).rejects.toThrow('410');
    });

    it('Resolves when the code is found, matches the encrypted version and isn\'t expired', () => {
        db().first.mockResolvedValueOnce({
            reset_code: 'code',
            expires: new Date().getTime() * 2,
        });
        expect(VerifyResetCode('code', 'email')).resolves.not.toThrow();
    });
})