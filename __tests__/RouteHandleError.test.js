const RouteHandleError = require('../Functions/Util/RouteHandleError');

describe('Testing route error handling', () => {
    const res = {
        sendStatus : (status) => status,
    };

    test('Testing the mock res object', () => {
        expect(res.sendStatus(500)).toBe(500);
    });

    it('Responds with the passed error when its a number', () => {
        const errNo = 500;
        expect(RouteHandleError(errNo, res)).toBe(errNo);
    });

    it('Responds with 500 on a non-number error', () => {
        const errMsg = 'This is an error';
        const error = new Error(errMsg);
        const code = 500;
        expect(RouteHandleError(error, res)).toBe(code);
    });
});