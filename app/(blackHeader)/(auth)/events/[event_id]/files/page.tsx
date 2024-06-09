import db from 'kotilogi-app/dbconfig';
import { EventFileListItem } from '@/components/Feature/ListItem/FileListItem';
import { FilesGallery } from '@/components/Feature/FilesGallery';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';

export default async function Page({ params }) {
  const files = await db('eventFiles').where({
    refId: params.event_id,
    mimeType: 'application/pdf',
  });

  const [{ createdBy: eventAuthor }] = await db('propertyEvents').where({ id: params.event_id });
  const session = (await getServerSession(options as any)) as any;
  const editingDisabled = eventAuthor !== session.user.email;

  return (
    <FilesGallery
      isDisabled={editingDisabled}
      variant='pdf'
      tablename='eventFiles'
      refId={params.event_id}
      files={files}
      FileComponent={EventFileListItem}
    />
  );
}
