import * as usage from '../usage';
import * as database from '../database';

jest.mock('../database');

describe('Testing the usage module', () => {
    describe('Testing the getByDateRange function', () => {
        const testData = [{time: '100'}, {time: '120'}, {time: '130'}];

        it('Returns data in the correct range', async () => {
            database.get.mockResolvedValueOnce(testData);
            const result = await usage.getByDateRange(120, 130);
            expect(result.includes(testData[0])).toBeFalsy();
        });

        it('Throws normally if the query fails', async () => {
            database.get.mockRejectedValueOnce('unexpected');
            await expect(usage.getByDateRange(100, 200)).rejects.toBe('unexpected');
        });
    });
})