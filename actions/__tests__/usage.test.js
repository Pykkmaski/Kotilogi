import * as usage from '../usage';
import * as database from '../database';
import {mergeByMonth, splitByMonth, getYears} from '../usage.utils';

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

    describe('Testing the getByYear-function', () => {
        it('Returns the correct data', async () => {
            database.get.mockResolvedValueOnce([
                {
                    time: '2024-01-01',
                    refId: 'test'
                },
                {
                    time: '2023-01-01',
                    refId: 'test',
                }
            ]);
            await expect(usage.getByYear(2023, {refId: 'test'})).resolves.toEqual([{
                time: '2023-01-01',
                refId: 'test'
            }]);
        });
    });

    describe('Testing the mergeByMonth-function', () => {
        it('Correctly returns the data when accumulate is false', () => {
            const testData = [
                {
                    time: '2024-01-01',
                    price: 10,
                },

                {
                    time: '2024-01-03',
                    price: 10,
                },

                {
                    time: '2024-02-01',
                    price: 10,
                }
            ];

            const result = mergeByMonth(testData, false);
            expect(result.length).toBe(12);

            const comparison = Array(12).fill(0);
            comparison[0] = 20;
            comparison[1] = 10;

            expect(result).toEqual(comparison);
        })

        it('Correctly returns the data when accumulate is true', () => {
            const testData = [
                {
                    time: '2024-01-01',
                    price: 10,
                },

                {
                    time: '2024-01-03',
                    price: 10,
                },

                {
                    time: '2024-02-01',
                    price: 10,
                }
            ];

            const result = mergeByMonth(testData, true);
            expect(result.length).toBe(12);

            const comparison = Array(12).fill(30);
            comparison[0] = 20;
            comparison[1] = 30;

            expect(result).toEqual(comparison);
        })
    });

    describe('Testing the splitByMonth-function', () => {
        it('Correctly returns the data', async () => {
            const testData = [
                {
                    time: '2024-01-01',
                },

                {
                    time: '2024-01-02',
                },

                {
                    time: '2024-02-01'
                }
            ];

            const result = splitByMonth(testData);

            const expectation = Array(12).fill([]);
            expectation[0] = [
                {
                    time: '2024-01-01',
                },

                {
                    time: '2024-01-02',
                },
            ];

            expectation[1] = [
                {
                    time: '2024-02-01'
                }
            ]
            expect(result).toEqual(expectation);
        })
    });

    describe('Testing the getYears-function', () => {
        it('Correctly returns each year represented in the data', () => {
            const testData = [
                {time: '2024-01-01'},
                {time: '2024-01-02'},
                {time: '2023-01-02'},
                {time: '2022-01-24'},
                {time: '2018-01-23'},
            ];

            const years = getYears(testData);
            expect(years).toEqual([2018, 2022, 2023, 2024]);
        });
    })
})