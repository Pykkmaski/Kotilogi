import { FilePage } from '@/components/New/Prefabs/FilePage';
import db from 'kotilogi-app/dbconfig';

export default async function StepFilePage({ params }) {
  return (
    <FilePage
      files={await db('data_files')
        .join('data_objects', { 'data_objects.id': 'data_files.id' })
        .where({ parentId: params.stepId })}
      objectId={params.stepId}
    />
  );
}
