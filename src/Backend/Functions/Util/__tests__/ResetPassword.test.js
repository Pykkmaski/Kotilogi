const ResetPassword = require("../../../Functions/Util/ResetPassword");

describe('Testing password reset function', () => {
    it('Rejects when provided passwords dont match', () => {
        const password1 = 'pass1';
        const password2 = 'pass2';
        expect(ResetPassword('test', password1, password2)).rejects.toThrow("409");
    });
});