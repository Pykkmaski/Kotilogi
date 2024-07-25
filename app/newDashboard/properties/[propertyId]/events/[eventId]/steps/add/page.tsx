import db from 'kotilogi-app/dbconfig';
import { StepForm } from './_components/StepForm';

export default async function AddStepPage({ params }) {
  const [step] = await db('data_propertyEventSteps')
    .join('data_objects', { 'data_objects.id': 'data_propertyEventSteps.id' })
    .where({ id: params.eventId });
  return (
    <StepForm
      eventId={params.eventId}
      step={step}
    />
  );
}
