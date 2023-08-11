const RouteHandleError = require('../../../Functions/Util/RouteHandleError');
//jest.mock('express');
const {res} = require('express');

//jest.spyOn(res, 'sendStatus').mockImplementation((status) => status);

describe('Testing route error handling', () => {
    it('Responds with the passed error when its a number', () => {
        const error = new Error(404);
        expect(RouteHandleError(error, res)).toBe(404);
    });

    it('Responds with 500 on a non-number error', () => {
        const errMsg = 'This is a test error';
        const error = new Error(errMsg);
        const code = 500;
        expect(RouteHandleError(error, res)).toBe(code);
    });

    it('Should not respond with 500 when the error is a number', () => {
        const code = 404;
        const error = new Error(code);
        expect(RouteHandleError(error, res)).not.toBe(500);
    });

    it('Should return 500 when passed a non-Error type error', () => {
        const error = 404;
        expect(RouteHandleError(error, res)).toBe(500);
    });

    it('Should return 500 when passed error does not have a message property', () => {
        const error = {error : 'This is an error'};
        expect(RouteHandleError(error, res)).toBe(500);
    });

    afterAll(() => {
        jest.clearAllMocks();
     });
});