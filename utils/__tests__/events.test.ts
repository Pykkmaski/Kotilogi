import { DatabaseTable } from '../databaseTable';
import { events } from '../events';
import db from '@/dbconfig';
import { Files } from '../files';

jest.mock('@/dbconfig');
jest.mock('@/utils/files');
jest.mock('@/utils/databaseTable');
jest.mock('@/utils/files');

describe('Testing event edit verification.', () => {
  it('Throws an error when trying to edit as a different user than the creator of the event.', () => {
    expect(() => (events as any).verifyEdit('unauthorized_user', 'authorized_user')).toThrow(
      'unauthorized'
    );
  });

  it('Accepts an edit if the editor is the creator of the event.', () => {
    expect(() => {
      (events as any).verifyEdit('authorized', 'authorized');
    }).not.toThrow();
  });
});

describe('Testing the addEvent-method.', () => {
  const testEvent = {
    title: 'TEST',
  } as Kotidok.EventType;

  it('Successfully adds an event without files.', async () => {
    (DatabaseTable.transaction as jest.Mock) = jest.fn().mockResolvedValueOnce({
      rollback: jest.fn(),
      commit: jest.fn(),
    });

    (DatabaseTable.prototype.add as jest.Mock).mockResolvedValueOnce([{ id: 0 }]);

    await events.addEvent(testEvent, 'testuser');
    expect(DatabaseTable).toHaveBeenCalledWith('propertyEvents', expect.anything());
    expect(DatabaseTable.transaction).toHaveBeenCalledTimes(1);
    expect(DatabaseTable.prototype.add).toHaveBeenCalledWith(
      {
        title: testEvent.title,
        consolidationTime: expect.any(Number),
        createdBy: 'testuser',
      },
      'id'
    );
    expect(Files.prototype.addFile).toHaveBeenCalledTimes(0);
  });

  it('Successfully adds an event with files.', async () => {
    (DatabaseTable.transaction as jest.Mock) = jest.fn().mockResolvedValueOnce({
      rollback: jest.fn(),
      commit: jest.fn(),
    });

    (DatabaseTable.prototype.add as jest.Mock).mockResolvedValueOnce([{ id: 0 }]);

    const testFiles = [
      {
        type: 'file',
      },

      {
        type: 'another_file',
      },
    ];

    await events.addEvent(testEvent, 'testuser', testFiles as File[]);
    expect(DatabaseTable).toHaveBeenCalledWith('propertyEvents', expect.anything());
    expect(DatabaseTable.transaction).toHaveBeenCalledTimes(1);
    expect(DatabaseTable.prototype.add).toHaveBeenCalledWith(
      {
        title: testEvent.title,
        consolidationTime: expect.any(Number),
        createdBy: 'testuser',
      },
      'id'
    );
    expect(Files.prototype.addFile);
    expect(Files.prototype.addFile).toHaveBeenLastCalledWith(testFiles[1], 0);
  });
});
