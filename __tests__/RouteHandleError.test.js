const RouteHandleError = require('../Functions/Util/RouteHandleError');
jest.mock('express');
const res = require('express').response;

jest.spyOn(res, 'sendStatus').mockImplementation((status) => status);

describe('Testing route error handling', () => {
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