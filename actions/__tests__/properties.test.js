import * as database from '../database';
import * as properties from '../properties';

jest.mock('../database');

describe('Testing the properties module', () => {
    describe('Testing the verifyDeletion function', () => {
        const DAY = 60 * 60 * 24 * 1000;

        it('Allows deletion if a property is under 7 days old', async () => {
            const TESTDATA = {createdAt: new Date(Date.now() - DAY).toString()};
            database.get.mockResolvedValueOnce([TESTDATA]);
            const result = await properties.verifyDeletion({
                createdAt: new Date(),
            });

            expect(result).toBeTruthy();
        });

        it('Rejects deletion if the property is a week old', async () => {
            const TESTDATA = {createdAt: new Date(Date.now() - DAY * 7).toString()};
            database.get.mockResolvedValueOnce([TESTDATA]);

            const result = await properties.verifyDeletion({
                createdAt: new Date(),
            });

            expect(result).toBeFalsy();
        });
    });
});