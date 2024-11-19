import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { Divider } from '@mui/material';
import { FileDataType } from 'kotilogi-app/dataAccess/types';

type EventDocumentProps = React.PropsWithChildren & {
  title: string;
  description: string;
  date: Date;
  files?: FileDataType[];
};

export function EventDocument({ children, title, description, date, files }: EventDocumentProps) {
  const splitTitle = title.split(' ');

  return (
    <ContentBox>
      <div className='flex flex-col gap-8 text-lg'>
        {/**Document header */}
        <div className='flex flex-col'>
          <div className='flex justify-between items-start'>
            <h1 className='text-xl font-semibold'>
              <span className='text-secondary'>
                {[splitTitle.at(0), splitTitle.at(1)].join(' ')}
              </span>
              <span> {splitTitle.at(-1)}</span>
            </h1>
            <span>{date.toLocaleDateString('fi')}</span>
          </div>

          <p>{description}</p>
        </div>

        <Divider />
        <div className='flex flex-col gap-4'>
          <h2 className='font-semibold mb-4'>Tiedot</h2>
          {children}
        </div>
      </div>
    </ContentBox>
  );
}
