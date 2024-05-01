import {formatString} from '../formatString';

describe('Testing the formatString-method', () => {
    it('Correctly formats the input', () => {
        var currentString = '123';
        currentString = formatString(currentString, '4', 4, ' ');

        expect(currentString).toBe('1234');

        currentString = formatString(currentString, '5', 4, ' ');
        expect(currentString).toBe('1234 5');

        currentString = formatString(currentString, '678', 4, ' ');
        expect(currentString).toBe('1234 5678');
    });
})