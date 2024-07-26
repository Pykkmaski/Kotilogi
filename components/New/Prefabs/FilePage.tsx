import { FileDataType } from 'kotilogi-app/models/types';
import { Main } from '../Main';
import { SecondaryHeading } from '../Typography/Headings';
import { Button, ImageList, ImageListItem } from '@mui/material';
import Image from 'next/image';
import { FileCard } from '../FileCard';
import { SpaceBetween } from '../Spacers';
import { Add } from '@mui/icons-material';
import Link from 'next/link';

type FilePageProps = {
  files: FileDataType[];
};

export async function FilePage({ files }: FilePageProps) {
  return (
    <Main>
      <SpaceBetween
        firstElement={<SecondaryHeading>Tiedostot</SecondaryHeading>}
        secondElement={
          <Link href='add'>
            <Button
              variant='text'
              startIcon={<Add />}>
              Lisää Uusi
            </Button>
          </Link>
        }
      />

      <div className='flex gap-4 w-full flex-wrap justify-center'>
        {files.map(file => (
          <FileCard file={file} />
        ))}
      </div>
    </Main>
  );
}
