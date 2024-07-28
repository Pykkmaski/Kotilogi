import { FileDataType } from 'kotilogi-app/models/types';
import { Main } from '../Main';
import { SecondaryHeading, TertiaryHeading } from '../Typography/Headings';
import { Button, ImageList, ImageListItem } from '@mui/material';
import Image from 'next/image';
import { FileCard } from '../FileCard';
import { SpaceBetween } from '../Spacers';
import { Add } from '@mui/icons-material';
import Link from 'next/link';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { FileError } from '@/components/Feature/GalleryBase/Components/Error/FileError';

type FilePageProps = {
  files: FileDataType[];
  objectId: string;
};

export async function FilePage({ files, objectId }: FilePageProps) {
  return (
    <Main>
      <SpaceBetween
        firstElement={<SecondaryHeading>Tiedostot</SecondaryHeading>}
        secondElement={
          <Link href={`/newDashboard/files/add?parentId=${objectId}`}>
            <Button
              variant='text'
              startIcon={<Add />}>
              Lisää Uusi
            </Button>
          </Link>
        }
      />

      <div className='flex gap-4 w-full flex-wrap justify-center'>
        {files.length ? (
          files.map(file => <FileCard file={file} />)
        ) : (
          <FileError message='Kohteelle ei ole vielä lisätty tiedostoja.' />
        )}
      </div>
    </Main>
  );
}
