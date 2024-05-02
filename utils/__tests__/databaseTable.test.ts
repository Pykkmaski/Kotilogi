import { DatabaseTable } from '../databaseTable';
import db from '@/dbconfig';

const testTableName = 'testTable';
const table = new DatabaseTable(testTableName);

jest.mock('@/dbconfig');

describe('Testing the add method.', () => {
  it('Calls the knex insert-method correctly.', async () => {
    const testData = {
      prop: 'test',
    };

    await table.add(testData);
    expect(db).toHaveBeenCalledWith(testTableName);
    expect(db.insert).toHaveBeenCalledWith(testData, undefined);
  });

  it('Calls the knex insert-method correctly with all args.', async () => {
    const testData = {
      prop: 'test',
    };

    await table.add(testData, 'id');
    expect(db).toHaveBeenCalledWith(testTableName);
    expect(db.insert).toHaveBeenCalledWith(testData, 'id');
  });
});

describe('Testing the del method.', () => {
  it('Calls the knex del-method correctly.', async () => {
    const query = {
      prop: 'test',
    };

    await table.del(query);
    expect(db).toHaveBeenCalledWith(testTableName);
    expect(db.where).toHaveBeenCalledWith(query);
    expect(db.del).toHaveBeenCalled();
  });
});

describe('Testing the update method.', () => {
  it('Calls the knex update-method correctly.', async () => {
    const query = {
      prop: 'test',
    };
    const testData = {
      data: 'test',
    };

    await table.update(testData, query, 'id');
    expect(db).toHaveBeenCalledWith(testTableName);
    expect(db.where).toHaveBeenCalledWith(query);
    expect(db.update).toHaveBeenCalledWith(testData, 'id');
  });
});

describe('Testing the select method.', () => {
  it('Calls the knex select-method correctly.', async () => {
    const query = {
      prop: 'test',
    };

    const colName = 'col';

    await table.select(colName, query);
    expect(db).toHaveBeenCalledWith(testTableName);
    expect(db.where).toHaveBeenCalledWith(query);
    expect(db.select).toHaveBeenCalledWith(colName);
  });
});

describe('Testing the get method.', () => {
  it('Calls the knex where-method correctly.', async () => {
    const query = {
      prop: 'test',
    };

    await table.get(query);
    expect(db).toHaveBeenCalledWith(testTableName);
    expect(db.where).toHaveBeenCalledWith(query);
  });
});

describe('Testing the pluck method.', () => {
  it('Calls the knex pluck-method correctly.', async () => {
    const query = {
      prop: 'test',
    };
    const colName = 'col';
    await table.pluck(colName, query);
    expect(db).toHaveBeenCalledWith(testTableName);
    expect(db.where).toHaveBeenCalledWith(query);
    expect(db.pluck).toHaveBeenCalledWith(colName);
  });
});

describe('Testing the static transaction-method.', () => {
  it('Returns a callable function when mocked.', () => {
    (DatabaseTable.transaction as jest.Mock) = jest.fn().mockReturnValue({
      rollback: () => 'rollback',
    });

    expect(typeof DatabaseTable.transaction).toBe('function');
  });
});
