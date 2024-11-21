import { FileDataType } from 'kotilogi-app/dataAccess/types';
import {
  PreviewContentBase,
  PreviewContentHeader,
  PreviewContentRow,
} from '../Boxes/PreviewContent';
import { FileCopy, Image } from '@mui/icons-material';
import { ContentBox } from '../Boxes/ContentBox';
import { FileCard } from '../FileCard';

type FileOverviewProps = {
  files: FileDataType[];
  addNewUrl?: string;
  showAllUrl?: string;
  preview?: boolean;
  PreviewComponent?: ({ item }: { item: FileDataType }) => React.ReactElement;
};

export function FileOverview({
  files,
  addNewUrl,
  showAllUrl,
  preview,
  PreviewComponent,
}: FileOverviewProps) {
  return (
    <ContentBox>
      <div className='flex flex-col'>
        <PreviewContentHeader
          title='Tiedostot ja kuvat'
          preview={preview}
          showAllUrl={showAllUrl}
          addNewUrl={addNewUrl}
          icon={<FileCopy />}
        />
        <div className='w-full xs:grid xs:grid-cols-2 md:flex md:flex-row gap-2'>
          {files.length ? (
            files.map(f => (
              <FileCard
                file={f}
                isMain={false}
              />
            ))
          ) : (
            <span>Ei tiedostoja.</span>
          )}
        </div>
      </div>
    </ContentBox>
  );
}
