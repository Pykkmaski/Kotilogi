import { FileCard } from '@/components/New/FileCard';
import { Main } from '@/components/New/Main';
import { FilePage } from '@/components/New/Prefabs/FilePage';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { ImageList, ImageListItem } from '@mui/material';
import db from 'kotilogi-app/dbconfig';
import Image from 'next/image';

export default async function PropertyFilesPage({ params }) {
  const id = params.propertyId;
  const files = await db('data_files')
    .join('data_objects', { 'data_objects.id': 'data_files.id' })
    .where({ parentId: id });

  return (
    <FilePage
      files={files}
      objectId={id}
    />
  );
}
