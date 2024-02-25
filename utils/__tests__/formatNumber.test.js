import {formatNumber} from '../formatNumber';

describe('Testing the formatNumber function', () => {
    it('Correctly formats a number', () => {
        const result = formatNumber(10.50);
        expect(result).toBe('10,50');
    });
})