import db from 'kotilogi-app/dbconfig';
import { Files } from './files';
import { createDueDate } from './createDueDate';
import { DatabaseTable } from './databaseTable';

class Events {
  private verifyEdit(editorId: number, createdBy: number) {
    if (editorId !== createdBy) {
      throw new Error('unauthorized');
    }
  }

  async addEvent(eventData: Kotidok.EventType, createdBy: number, files?: File[]) {
    const trx = await DatabaseTable.transaction();
    const eventsTable = new DatabaseTable('propertyEvents', trx);
    const eventFilesTable = new Files('eventFiles', trx);

    try {
      const [{ id: eventId }] = await eventsTable.add(
        {
          ...eventData,
          consolidationTime: createDueDate(7),
          createdBy,
        },
        'id'
      );

      const filePromises = files?.map(file => eventFilesTable.addFile(file, eventId));
      if (filePromises) {
        await Promise.all(filePromises);
      }

      await trx.commit();
    } catch (err) {
      console.log(err.message);
      await trx.rollback();
      await eventFilesTable.rollbackFiles();
      throw err;
    }
  }

  async deleteEvent(eventId: string, editorId: number) {
    const trx = await DatabaseTable.transaction();
    const eventsTable = new DatabaseTable('propertyEvents', trx);
    const eventFilesTable = new Files('eventFiles', trx);

    try {
      console.log(eventId);

      const [{ createdBy }] = await trx('propertyEvents')
        .where({ id: eventId })
        .select('createdBy');
      this.verifyEdit(editorId, createdBy);

      const fileNames = (await trx('eventFiles').where({ refId: eventId }).pluck('id')) as string[];
      const fileDelPromises = fileNames.map(id => eventFilesTable.deleteFile(id));
      await Promise.all(fileDelPromises);

      await eventsTable.del({ id: eventId });
      await trx.commit();
    } catch (err) {
      console.log(err.message);
      await trx.rollback();
      await eventFilesTable.rollbackFiles();
    }
  }

  async updateEvent(eventId: string, newEventData: Partial<Kotidok.EventType>, editorId: number) {
    const table = new DatabaseTable('propertyEvents');
    const [{ createdBy }] = await table.select('createdBy', { id: eventId });
    this.verifyEdit(editorId, createdBy);

    console.log(eventId);
    await table.update(newEventData, { id: eventId });
  }
}

export const events = new Events();
