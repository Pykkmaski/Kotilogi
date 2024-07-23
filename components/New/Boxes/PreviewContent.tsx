import { ObjectDataType } from 'kotilogi-app/models/types';
import { ContentBox } from './ContentBox';
import { EditLink } from '../Links/EditLink';
import { SpaceBetween, Spacer } from '../Spacers';
import { SecondaryHeading, TertiaryHeading } from '../Typography/Headings';
import { BoxHeader } from './BoxHeader';
import Link from 'next/link';
import { Button, IconButton } from '@mui/material';
import { Add, Visibility, Warning } from '@mui/icons-material';
import { HideOnMobile } from '../Util/HideOnMobile';
import { Paragraph } from '../Typography/Paragraph';

type PreviewContentBaseProps = React.PropsWithChildren & {
  icon?: React.ReactNode;
  headingText: string;
  showAllUrl?: string;
  addNewUrl?: string;
  preview?: boolean;
  previewDescription?: React.ReactNode;
};

export function PreviewContentBase({
  children,
  headingText,
  showAllUrl,
  addNewUrl,
  preview,
  icon,
  previewDescription,
}: PreviewContentBaseProps) {
  return (
    <ContentBox>
      <Spacer direction='col'>
        <BoxHeader>
          <SpaceBetween
            firstElement={
              <div className='flex gap-2 text-slate-500 items-baseline text-lg'>
                {icon}
                <SecondaryHeading>{headingText}</SecondaryHeading>
              </div>
            }
            secondElement={
              <div className='flex flex-row gap-1'>
                {!preview && showAllUrl ? (
                  <>
                    <Link
                      href={showAllUrl}
                      title='Näytä kaikki'>
                      <IconButton color='primary'>
                        <Visibility />
                      </IconButton>
                    </Link>
                  </>
                ) : null}
                {!preview && addNewUrl ? (
                  <>
                    <Link
                      href={addNewUrl}
                      title='Lisää uusi'>
                      <IconButton color='primary'>
                        <Add />
                      </IconButton>
                    </Link>
                  </>
                ) : null}
              </div>
            }
          />
        </BoxHeader>

        {!preview ? (
          children
        ) : (
          <div className='flex flex-col gap-4'>
            <div className='text-slate-500 text-lg w-full flex items-center gap-4'>
              <Warning sx={{ color: 'orange' }} />
              <span className='font-semibold'>Tulossa pian!</span>
            </div>
            <Paragraph>{previewDescription}</Paragraph>
          </div>
        )}
      </Spacer>
    </ContentBox>
  );
}

type PreviewContentRowProps<T> = PreviewContentBaseProps & {
  itemsToDisplay: number;
  data: T[];
  PreviewComponent: ({ item }: { item: T }) => React.ReactNode;
  onEmptyElement?: React.ReactNode;
};

/*Responsible for showing a preview set of a total dataset. Renders the items horizontally.*/
export function PreviewContentRow<T>({
  itemsToDisplay,
  data,
  PreviewComponent,
  onEmptyElement,
  ...props
}: PreviewContentRowProps<T>) {
  return (
    <PreviewContentBase {...props}>
      {!data.length ? (
        onEmptyElement || null
      ) : (
        <Spacer direction='row'>
          {data.map(item => (
            <PreviewComponent item={item} />
          ))}
        </Spacer>
      )}
    </PreviewContentBase>
  );
}

type PreviewContentBoxProps = {
  title: string;
  href: string;
  FooterContentComponent: () => React.ReactNode;
};

export function PreviewContentBox({ title, href, FooterContentComponent }: PreviewContentBoxProps) {
  return (
    <Link
      className='rounded-lg shadow-md aspect-square relative p-2 overflow-hidden'
      href={href}>
      <div className='flex justify-between w-full'>
        <TertiaryHeading>{title}</TertiaryHeading>
      </div>

      <div className='flex absolute bottom-0 left-0 w-full p-2'>
        <FooterContentComponent />
      </div>
    </Link>
  );
}
