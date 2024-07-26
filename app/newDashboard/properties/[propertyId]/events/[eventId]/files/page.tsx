import { FilePage } from '@/components/New/Prefabs/FilePage';
import db from 'kotilogi-app/dbconfig';

export default async function EventFilesPage({ params }) {
  const files = await db('data_objects')
    .join('data_files', { 'data_files.id': 'data_objects.id' })
    .where({ parentId: params.eventId });
  return <FilePage files={files} />;
}
