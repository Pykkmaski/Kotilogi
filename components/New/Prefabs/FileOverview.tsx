import { FileDataType } from 'kotilogi-app/dataAccess/types';
import { PreviewContentRow } from '../Boxes/PreviewContent';
import { Image } from '@mui/icons-material';

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
    <PreviewContentRow
      icon={<Image />}
      preview={preview}
      headingText='Tiedostot ja kuvat'
      itemsToDisplay={8}
      data={files}
      addNewUrl={addNewUrl}
      showAllUrl={showAllUrl}
      onEmptyElement={<span className='text-slate-500'>Ei tiedostoja.</span>}
      PreviewComponent={PreviewComponent}
    />
  );
}
