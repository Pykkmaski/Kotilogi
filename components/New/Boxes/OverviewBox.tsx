'use client';

import { ContentBox } from './ContentBox';
import { MainHeading } from '../Typography/Headings';
import { SpaceBetween, Spacer } from '../Spacers';
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
      <Spacer direction='row'>
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

        <Spacer direction='col'>
          <SpaceBetween
            firstElement={
              showUrl ? (
                <Link href={showUrl}>
                  <MainHeading>{title}</MainHeading>
                </Link>
              ) : (
                <MainHeading>{title}</MainHeading>
              )
            }
            secondElement={
              <div className='flex'>
                {editUrl && (
                  <Link
                    href={editUrl}
                    title={editContentText || 'Näytä'}>
                    <IconButton color='primary'>{editIcon || <Visibility />}</IconButton>
                  </Link>
                )}
                {deleteUrl && (
                  <Link href={deleteUrl}>
                    <IconButton color='warning'>
                      <Delete />
                    </IconButton>
                  </Link>
                )}
              </div>
            }
          />

          <div>{description}</div>

          <div className='flex justify-end w-full mt-auto'>
            {selectableItem && (
              <SelectablesProvider.SelectTrigger item={selectableItem}>
                <input type='checkbox'></input>
              </SelectablesProvider.SelectTrigger>
            )}
          </div>
        </Spacer>
      </Spacer>
    </ContentBox>
  );
}
