import 'server-only';

import db from 'kotilogi-app/dbconfig';
import { verifySession } from 'kotilogi-app/utils/verifySession';

export async function verifySessionUserIsAuthor(objectId: string) {
  const session = await verifySession();

  const [authorId] = await db('data_objects').where({ id: objectId }).pluck('authorId');
  if (session.user.id !== authorId) {
    throw new Error('Vain tiedon laatija voi muokata tai poistaa sen!');
  }
}
