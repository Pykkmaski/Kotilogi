import { Main } from '@/components/New/Main';
import db from 'kotilogi-app/dbconfig';
import { StepForm } from '../../add/_components/StepForm';

export default async function EditStepPage({ params }) {
  const stepId = params.stepId;
  const [step] = await db('data_propertyEventSteps')
    .join('data_objects', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({ 'data_objects.id': stepId })
    .select('title', 'description', 'time', 'data_objects.id');

  console.log(step);
  return (
    <Main>
      <StepForm
        eventId={params.eventId}
        step={step}
      />
    </Main>
  );
}
