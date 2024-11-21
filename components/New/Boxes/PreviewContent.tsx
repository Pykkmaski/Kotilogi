import { ContentBox } from './ContentBox';
import { Spacer } from '../../UI/Spacer';
import { SecondaryHeading, TertiaryHeading } from '../Typography/Headings';
import { BoxHeader, BoxTitle } from './BoxHeader';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import { Add, Visibility, Warning } from '@mui/icons-material';
import { Paragraph } from '../Typography/Paragraph';
import { noScrollBar } from 'kotilogi-app/utils/noScrollBar';
import { List } from '../List';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { ReactNode } from 'react';

type PreviewContentHeaderProps = {
  title: string;
  icon?: ReactNode;
  preview?: boolean;
  showAllUrl?: string;
  addNewUrl?: string;
};

export function PreviewContentHeader({
  title,
  icon,
  preview,
  showAllUrl,
  addNewUrl,
}: PreviewContentHeaderProps) {
  return (
    <BoxHeader>
      <div className='flex items-center gap-4 w-full justify-between'>
        <BoxTitle
          icon={icon}
          text={title}
        />

        <List
          direction='row'
          alignItems='center'
          gap={'small'}>
          <RenderOnCondition condition={!preview && showAllUrl}>
            <Link
              href={showAllUrl}
              title='Näytä kaikki'>
              <IconButton color='secondary'>
                <Visibility />
              </IconButton>
            </Link>
          </RenderOnCondition>

          <RenderOnCondition condition={!preview && addNewUrl}>
            <Link
              href={addNewUrl}
              title='Lisää uusi'>
              <IconButton color='secondary'>
                <Add />
              </IconButton>
            </Link>
          </RenderOnCondition>
        </List>
      </div>
    </BoxHeader>
  );
}

type PreviewContentBaseProps = React.PropsWithChildren &
  PreviewContentHeaderProps & {
    previewDescription?: React.ReactNode;
  };

export function PreviewContentBase({
  children,
  title,
  showAllUrl,
  addNewUrl,
  preview,
  icon,
  previewDescription,
}: PreviewContentBaseProps) {
  return (
    <ContentBox>
      <div className='w-full'>
        <Spacer
          dir='col'
          grow>
          <PreviewContentHeader
            title={title}
            showAllUrl={showAllUrl}
            addNewUrl={addNewUrl}
            preview={preview}
            icon={icon}
          />

          <RenderOnCondition
            condition={!preview}
            fallback={
              <Spacer
                gap={'medium'}
                dir='col'
                full>
                <div className='text-slate-500 text-lg w-full flex items-center gap-4'>
                  <Warning sx={{ color: 'orange' }} />
                  <span className='font-semibold'>Tulossa pian!</span>
                </div>
                <Paragraph>{previewDescription}</Paragraph>
              </Spacer>
            }>
            {children}
          </RenderOnCondition>
        </Spacer>
      </div>
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
      <RenderOnCondition
        condition={data.length > 0}
        fallback={onEmptyElement || null}>
        <div
          className='flex md:flex-row xs:flex-col w-full xs:items-center lg:items-none overflow-x-scroll md:gap-4 xs:gap-1 snap-mandatory snap-x'
          style={noScrollBar}>
          {data.map(item => (
            <PreviewComponent item={item} />
          ))}
        </div>
      </RenderOnCondition>
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
      href={href}
      style={noScrollBar}>
      <Spacer
        dir='row'
        justify='between'>
        <TertiaryHeading>{title}</TertiaryHeading>
      </Spacer>

      <div className='flex absolute bottom-0 left-0 w-full p-2'>
        <FooterContentComponent />
      </div>
    </Link>
  );
}
