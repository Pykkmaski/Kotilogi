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

type FilePageProps = {
  files: FileDataType[];
  objectId: string;
};

export async function FilePage({ files, objectId }: FilePageProps) {
  return (
    <Main>
      <div className='flex justify-between'>
        <SecondaryHeading>Tiedostot</SecondaryHeading>
        <Link href={`/newDashboard/files/add?parentId=${objectId}`}>
          <Button
            variant='text'
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
