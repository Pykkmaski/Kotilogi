'use client';

import { ContentBox } from './ContentBox';
import { MainHeading } from '../Typography/Headings';
import { Spacer } from '../Spacer';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import Link from 'next/link';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { ObjectDataType } from 'kotilogi-app/dataAccess/types';
import { noScrollBar } from 'kotilogi-app/utils/noScrollBar';

type OverviewBoxProps = {
  title: string;
  description: React.ReactNode;
  imageUrl: string;
  editUrl?: string;
  showUrl?: string;
  editContentText?: string;
  editIcon?: React.ReactNode;
  selectableItem?: ObjectDataType;
  deleteUrl?: string;
};

export function OverviewBox({
  title,
  description,
  imageUrl,
  editUrl,
  showUrl,
  deleteUrl,
  editIcon,
  selectableItem,
  editContentText = 'Muokkaa Tietoja',
}: OverviewBoxProps) {
  return (
    <ContentBox>
      <div className='flex flex-row lg:gap-8 xs:gap-2 w-full'>
        <OverviewImage src={imageUrl} />

        <Spacer
          direction='col'
          width='full'
          gap={4}>
          <Spacer
            width='full'
            justifyItems='between'
            direction='row'>
            {showUrl ? (
              <Link href={showUrl}>
                <MainHeading>{title}</MainHeading>
              </Link>
            ) : (
              <MainHeading>{title}</MainHeading>
            )}

            <Spacer
              justifyItems='end'
              width='auto'>
              {editUrl && (
                <Link
                  href={editUrl}
                  title={editContentText || 'Näytä'}>
                  <IconButton
                    color='secondary'
                    size='small'>
                    {editIcon || <Visibility />}
                  </IconButton>
                </Link>
              )}
              {deleteUrl && (
                <Link href={deleteUrl}>
                  <IconButton
                    color='warning'
                    size='small'>
                    <Delete />
                  </IconButton>
                </Link>
              )}
            </Spacer>
          </Spacer>

          <p>{description}</p>

          <div className='mt-auto'>
            <Spacer
              justifyItems='end'
              width='full'>
              {selectableItem && (
                <SelectablesProvider.SelectTrigger item={selectableItem}>
                  <input type='checkbox'></input>
                </SelectablesProvider.SelectTrigger>
              )}
            </Spacer>
          </div>
        </Spacer>
      </div>
    </ContentBox>
  );
}

type OverviewImageProps = {
  src: string;
  /**A width of the container to occupy in percentage, on medium-size devices. Defaults to 25.*/
  mediumScreenWidth?: number;

  /**A width of the container to occupy in percentage, on small-size devices. Defaults to 30.*/
  smallScreenWidth?: number;
};

export const OverviewImage = ({
  src,
  mediumScreenWidth = 25,
  smallScreenWidth = 30,
}: OverviewImageProps) => {
  const classes = [
    'relative aspect-square flex-shrink-0 rounded-full overflow-hidden border border-slate-200',
    `md:w-[${mediumScreenWidth}%] xs:w-[${smallScreenWidth}%]`,
  ];

  return (
    <div
      className={classes.join(' ')}
      style={noScrollBar}>
      <Image
        src={src}
        fill={true}
        alt=''
        objectFit='cover'
      />
    </div>
  );
};
