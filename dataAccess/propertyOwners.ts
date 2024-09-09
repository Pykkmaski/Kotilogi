import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export async function addPropertyOwner(userId: string, propertyId: string) {
  //Only an owner of the property can add new owners.
  const session = await loadSession();
  const [owner] = await db('data_propertyOwners').where({ userId: session.user.id, propertyId });
  if (!owner) {
    throw new Error('Vain talon omistaja voi lisätä uusia omistajia!');
  }

  try {
    await db('data_propertyOwners').insert({
      userId,
      propertyId,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.error(err.message);
    const msg = err.message;
    if (msg.includes('duplicate')) {
      throw new Error('Käyttäjä on jo talon omistaja!');
    } else {
      throw err;
    }
  }
}

export async function deletePropertyOwner(userId: string, propertyId: string) {
  const [record] = await db('data_propertyOwners').where({ userId, propertyId });
  if (!record) {
    throw new Error('Käyttäjä ei ole talon omistaja!');
  }

  //Disallow the owner to delete themsleves.
  const session = await loadSession();
  if (record.userId === session.user.id) {
    throw new Error('Käyttäjä ei voi poistaa itseänsä omistajista!');
  }

  await db('data_propertyOwners').where({ userId, propertyId }).del();
}

export async function updatePropertyOwner(newOwnerId: string, propertyId: string) {
  const session = await loadSession();
  const [record] = await db('data_propertyOwners').where({ userId: session.user.id, propertyId });
  if (!record) {
    throw new Error('Käyttäjä ei ole talon omistaja!');
  }

  await db('data_propertyOwners').where({ userId: session.user.id, propertyId }).update({
    userId: newOwnerId,
    timestamp: Date.now(),
  });
}
