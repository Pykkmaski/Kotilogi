import db from 'kotilogi-app/dbconfig';
import { StepForm } from './_components/StepForm';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export default async function AddStepPage({ params }) {
  const session = await loadSession();
  const [eventAuthor] = await db('data_objects').where({ id: params.eventId }).pluck('authorId');
  const [step] = await db('data_propertyEventSteps')
    .join('data_objects', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({ 'data_objects.id': params.eventId });

  const allowed = session.user.id == eventAuthor;

  return (
    (allowed && (
      <StepForm
        eventId={params.eventId}
        step={step}
      />
    )) || <span>Vain tapahtuman laatija voi lisätä vaiheita!</span>
  );
}
