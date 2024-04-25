import db from 'kotilogi-app/dbconfig';
import { PropertyImageListItem } from '@/components/Feature/ListItem/ImageListItem';
import { FilesGallery } from '@/components/Feature/FilesGallery';

async function getImages(propertyId) {
  return await db('propertyFiles').where({ refId: propertyId, mimeType: 'image/jpeg' });
}

export default async function FilesPage({ params }) {
  const images = await getImages(params.property_id);

  return (
    <main>
      <FilesGallery
        variant='image'
        tablename='propertyFiles'
        files={images}
        refId={params.property_id}
        FileComponent={PropertyImageListItem}
      />
    </main>
  );
}
