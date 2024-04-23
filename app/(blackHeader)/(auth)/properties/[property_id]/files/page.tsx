import db from 'kotilogi-app/dbconfig';
import { Content } from './page.component';
import { FilesGallery } from '@/components/new/Gallery/GalleryBase/FilesGallery';
import { PropertyFileListItem } from '@/components/ListItem/FileListItem';
import { PropertyFilesList } from './PropertyFilesList';

async function getFiles(propertyId) {
  return await db('propertyFiles').where({ refId: propertyId, mimeType: 'application/pdf' });
}

export default async function FilesPage({ params }) {
  const files = await getFiles(params.property_id);

  return (
    <main>
      <FilesGallery
        tablename='propertyFiles'
        refId={params.property_id}
        files={files}
        FileComponent={PropertyFileListItem}
      />
    </main>
  );
}
