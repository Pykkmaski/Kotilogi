import db from 'kotilogi-app/dbconfig';
import { Content } from './page.components';
import { FilesGallery } from '@/components/new/Gallery/GalleryBase/FilesGallery';
import { EventFileListItem } from '@/components/ListItem/FileListItem';

export default async function Page({ params }) {
  const files = await db('eventFiles').where({ refId: params.event_id, mimeType: 'application/pdf' });

  return <FilesGallery tablename='eventFiles' refId={params.event_id} files={files} FileComponent={EventFileListItem} />;
}
