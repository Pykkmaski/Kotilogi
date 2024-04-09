import {DatabaseTable} from '../databaseTable';
jest.mock('../databaseTable');

const testTableName = 'testTable';

test('Adds data successfully, returning its id.', async () => {
    const table = new DatabaseTable(testTableName);
    const testId = 'testId';
    table.add.mockResolvedValueOnce([{id: testId}]);

    await table.add({}, 'id').then(([{id}]) => {
        expect(id).toBe(testId);
    });
});
