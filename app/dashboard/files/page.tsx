import { FilePage } from '@/components/New/Prefabs/FilePage';
import db from 'kotilogi-app/dbconfig';

export default async function FilesPage({ searchParams }) {
  const { parentId, returnUrl } = searchParams;
  const files = await db('data_objects')
    .join('data_files', { 'data_files.id': 'data_objects.id' })
    .where({ parentId });

  return (
    <FilePage
      files={files}
      objectId={parentId}
      returnUrl={returnUrl}
    />
  );
}
