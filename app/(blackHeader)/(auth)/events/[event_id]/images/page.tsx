import db from 'kotilogi-app/dbconfig';
import { EventImageListItem } from '@/components/Feature/ListItem/ImageListItem';
import { FilesGallery } from '@/components/Feature/FilesGallery';

export default async function Page({ params }) {
  const images = await db('eventFiles').where({ refId: params.event_id, mimeType: 'image/jpeg' });

  return (
    <FilesGallery
      variant='image'
      tablename='eventFiles'
      refId={params.event_id}
      files={images}
      FileComponent={EventImageListItem}
    />
  );
}
