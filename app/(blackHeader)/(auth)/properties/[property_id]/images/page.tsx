import db from 'kotilogi-app/dbconfig';
import { PropertyImageListItem } from '@/components/Feature/ListItem/ImageListItem';
import { FilesGallery } from '@/components/Feature/FilesGallery';
import { ImageList, ImageListItem } from '@mui/material';

async function getImages(propertyId) {
  return (await db('propertyFiles').where({
    refId: propertyId,
    mimeType: 'image/jpeg',
  })) as Kotidok.FileType[];
}

export default async function FilesPage({ params }) {
  const images = await getImages(params.property_id);

  return (
    <main>
      <FilesGallery
        files={images}
        variant='image'
        tablename='propertyFiles'
        refId={params.property_id}
      />
    </main>
  );
}
