import db from 'kotilogi-app/dbconfig';
import { PropertyFileListItem } from '@/components/Feature/ListItem/FileListItem';
import { FilesGallery } from '@/components/Feature/FilesGallery';

async function getFiles(propertyId) {
  return await db('propertyFiles').where({ refId: propertyId, mimeType: 'application/pdf' });
}

export default async function FilesPage({ params }) {
  const files = await getFiles(params.property_id);

  return (
    <main>
      <FilesGallery
        variant='pdf'
        tablename='propertyFiles'
        refId={params.property_id}
        files={files}
        FileComponent={PropertyFileListItem}
      />
    </main>
  );
}
