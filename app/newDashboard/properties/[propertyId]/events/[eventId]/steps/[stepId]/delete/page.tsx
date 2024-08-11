import { Main } from '@/components/New/Main';
import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { DeleteStepForm } from './DeleteStepForm';

export default async function DeleteEventStepPage({ params }) {
  const stepId = params.stepId;
  const [step] = await db('data_propertyEventSteps')
    .join('data_objects', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({ 'data_propertyEventSteps.id': stepId });

  const session = await loadSession();
  const authorized = session.user.id == step.authorId;

  return !authorized ? (
    <span>Vain vaiheen luoja voi poistaa sen!</span>
  ) : (
    <Main>
      <DeleteStepForm step={step} />
    </Main>
  );
}
