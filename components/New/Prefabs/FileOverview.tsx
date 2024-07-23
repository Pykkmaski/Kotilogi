import { PreviewContentRow } from '../Boxes/PreviewContent';
import { Image } from '@mui/icons-material';

type FileOverviewProps = {
  files: TODO[];
  addNewUrl?: string;
  showAllUrl?: string;
  preview?: boolean;
  PreviewComponent?: ({ item }) => React.ReactElement;
};

export function FileOverview({
  files,
  addNewUrl,
  showAllUrl,
  preview,
  PreviewComponent,
}: FileOverviewProps) {
  return (
    <PreviewContentRow<TODO>
      icon={<Image />}
      preview={preview}
      headingText='Tiedostot ja kuvat'
      itemsToDisplay={3}
      data={files}
      addNewUrl={addNewUrl}
      showAllUrl={showAllUrl}
      onEmptyElement={<span className='text-slate-500'>Ei tiedostoja.</span>}
      PreviewComponent={PreviewComponent}
    />
  );
}
