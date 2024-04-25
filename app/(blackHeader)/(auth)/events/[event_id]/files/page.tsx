import db from 'kotilogi-app/dbconfig';
import { EventFileListItem } from '@/components/Feature/ListItem/FileListItem';
import { FilesGallery } from '@/components/Feature/FilesGallery';

export default async function Page({ params }) {
  const files = await db('eventFiles').where({
    refId: params.event_id,
    mimeType: 'application/pdf',
  });

  return (
    <FilesGallery
      variant='pdf'
      tablename='eventFiles'
      refId={params.event_id}
      files={files}
      FileComponent={EventFileListItem}
    />
  );
}
