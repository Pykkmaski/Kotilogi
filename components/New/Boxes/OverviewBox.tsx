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
      <Spacer
        direction='row'
        gap={2}
        width='full'>
        <div
          className='relative md:w-[25%] xs:w-[50%] aspect-square rounded-lg overflow-hidden border border-slate-200'
          style={noScrollBar}>
          <Image
            src={imageUrl}
            fill={true}
            alt=''
            objectFit='contain'
          />
        </div>

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
                    color='primary'
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
      </Spacer>
    </ContentBox>
  );
}
