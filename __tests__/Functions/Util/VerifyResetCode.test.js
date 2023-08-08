const VerifyResetCode = require('../../../Functions/Util/VerifyResetCode');
const db = require('../../../models/database');
const VerifyPassword = require('../../../Functions/Util/VerifyPassword');

jest.mock('../../../models/database');
jest.mock('../../../Functions/Util/VerifyPassword');
VerifyPassword.mockImplementation((a, b) => a === b);

describe('Testing the verifyResetCode function', () => {
    it('Rejects when no reset code exists', () => {
        jest.spyOn(db, 'getPasswordResetCode').mockResolvedValueOnce(undefined);
        expect(VerifyResetCode('code', 'email')).rejects.toThrow('404');
    });

    it('Rejects when the code does not match the encrypted code', () => {
        jest.spyOn(db, 'getPasswordResetCode').mockResolvedValueOnce({reset_code: 'code1'});
        expect(VerifyResetCode('code2', 'email')).rejects.toThrow('403');
    });

    it('Rejects when a code has expired', () => {
        jest.spyOn(db, 'getPasswordResetCode').mockResolvedValueOnce({
            reset_code: 'code',
            expires: 1,
        });
        expect(VerifyResetCode('code', 'email')).rejects.toThrow('410');
    });

    it('Resolves when the code is found, matches the encrypted version and isn\'t expired', () => {
        jest.spyOn(db, 'getPasswordResetCode').mockResolvedValueOnce({
            reset_code: 'code',
            expires: new Date().getTime() * 2,
        });
        expect(VerifyResetCode('code', 'email')).resolves.not.toThrow();
    });

    afterAll(() => {
        jest.clearAllMocks();
     });
})