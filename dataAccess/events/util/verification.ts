import db from 'kotilogi-app/dbconfig';
import { getDaysInMilliseconds } from 'kotilogi-app/utils/getDaysInMilliseconds';

/**Throws an error if the user already has the maximum number of allowed events for a property. */
export const verifyPropertyEventCount = async (propertyId: string) => {
  const [{ numEvents }] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_objects.parentId': propertyId })
    .count('* as numEvents');

  if (numEvents >= 100) {
    throw new Error('Et voi lisätä talolle enempää tapahtumia!');
  }
};

/**Throws an error if the event is at least 30 days old. */
export const verifyEventIsNotLocked = async (eventId: string) => {
  const [timestamp] = await db('data_propertyEvents')
    .join('data_objects', { 'data_objects.id': 'data_propertyEvents.id' })
    .where({ 'data_propertyEvents.id': eventId })
    .select('data_objects.timestamp');

  const now = Date.now();
  const maxEventAge = getDaysInMilliseconds(30);
  const eventAge = now - timestamp;
  if (eventAge >= maxEventAge) {
    throw new Error(
      'Tapahtuma on vähintään 30 päivää vanha, joten sitä ei voi enää muokata tai poistaa!'
    );
  }
};
