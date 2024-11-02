'use client';

import { FileDataType } from 'kotilogi-app/dataAccess/types';
import { Main } from '../Main';
import { SecondaryHeading, TertiaryHeading } from '../Typography/Headings';
import { Button, ImageList, ImageListItem } from '@mui/material';
import Image from 'next/image';
import { FileCard } from '../FileCard';
import { Add } from '@mui/icons-material';
import Link from 'next/link';
import { GalleryError } from '@/components/Feature/GalleryBase/Components/Error/GalleryError';
import { FileError } from '@/components/Feature/GalleryBase/Components/Error/FileError';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { Spacer } from '@/components/UI/Spacer';
import { useRouter } from 'next/navigation';

type FilePageProps = {
  files: FileDataType[];
  objectId: string;
};

export function FilePage({ files, objectId }: FilePageProps) {
  const router = useRouter();
  return (
    <Main>
      <div className='flex justify-between'>
        <Spacer
          dir='row'
          gap='medium'
          items='center'>
          <SecondaryHeading>Tiedostot</SecondaryHeading>
          <Button
            variant='text'
            color='secondary'
            onClick={() => router.back()}>
            Takaisin Kohteeseen
          </Button>
        </Spacer>

        <Link href={`/dashboard/files/add?parentId=${objectId}`}>
          <Button
            color='secondary'
            variant='contained'
            startIcon={<Add />}>
            Lisää Uusi
          </Button>
        </Link>
      </div>

      <div className='flex gap-4 w-full flex-wrap justify-center'>
        <RenderOnCondition
          condition={files.length > 0}
          fallback={<FileError message='Kohteelle ei ole vielä lisätty tiedostoja.' />}>
          {files.map(file => (
            <FileCard file={file} />
          ))}
        </RenderOnCondition>
      </div>
    </Main>
  );
}
