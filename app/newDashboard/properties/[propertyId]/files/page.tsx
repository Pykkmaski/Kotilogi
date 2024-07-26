import { FileCard } from '@/components/New/FileCard';
import { Main } from '@/components/New/Main';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { ImageList, ImageListItem } from '@mui/material';
import db from 'kotilogi-app/dbconfig';
import Image from 'next/image';

export default async function FilesPage({ params }) {
  const id = params.propertyId;
  const files = await db('data_files')
    .join('data_objects', { 'data_objects.id': 'data_files.id' })
    .where({ parentId: id });

  return (
    <Main>
      <SecondaryHeading>Kuvat</SecondaryHeading>
      <ImageList
        cols={4}
        rowHeight={200}>
        {files.map(file => (
          <ImageListItem>
            <FileCard file={file} />
          </ImageListItem>
        ))}
      </ImageList>
    </Main>
  );
}
