import db from 'kotilogi-app/dbconfig';
import { StepForm } from './_components/StepForm';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export default async function AddStepPage({ params }) {
  const session = await loadSession();
  const [eventAuthor] = await db('data_objects').where({ id: params.eventId }).pluck('authorId');

  const allowed = session.user.id == eventAuthor;

  return (
    (allowed && <StepForm eventId={params.eventId} />) || (
      <span>Vain tapahtuman laatija voi lisätä vaiheita!</span>
    )
  );
}
