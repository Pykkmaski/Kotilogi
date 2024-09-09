import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { redirect } from 'next/navigation';

export async function verifySessionUserIsAuthor(objectId: string) {
  const session = await loadSession(false);
  if (!session) {
    redirect('/login');
  }

  const [authorId] = await db('data_objects').where({ id: objectId }).pluck('authorId');
  if (session.user.id !== authorId) {
    throw new Error('Vain tiedon laatija voi muokata tai poistaa sen!');
  }
}
