import { deleteObject } from '../objects';
import { verifySessionUserIsAuthor } from '../utils/verifySessionUserIsAuthor';
import { verifyEventIsNotLocked } from './util/verification';

/**Deletes an event. Throws an error if the logged in user is not the author of the event, or if the event is locked.
 * @param id The id of the event to delete.
 */
export async function deleteEvent(id: string) {
  //Only allow the author of the event to delete it.
  await verifySessionUserIsAuthor(id);
  await verifyEventIsNotLocked(id);
  await deleteObject(id);
}
