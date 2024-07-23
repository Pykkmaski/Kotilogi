'use client';

import { ContentBox } from './ContentBox';
import { MainHeading } from '../Typography/Headings';
import { EditLink } from '../Links/EditLink';
import { SpaceBetween, Spacer } from '../Spacers';
import { Paragraph } from '../Typography/Paragraph';
import Image from 'next/image';
import { Button, IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import Link from 'next/link';
import { HideOnMobile } from '../Util/HideOnMobile';
import { Checkbox } from '@/components/UI/FormUtils';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { ObjectDataType } from 'kotilogi-app/models/types';

type OverviewBoxProps = {
  title: string;
  description: React.ReactNode;
  imageUrl: string;
  editUrl?: string;
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
  deleteUrl,
  editIcon,
  selectableItem,
  editContentText = 'Muokkaa Tietoja',
}: OverviewBoxProps) {
  console.log(deleteUrl);
  return (
    <ContentBox>
      <Spacer direction='row'>
        <div className='relative w-[25%] aspect-square rounded-lg overflow-hidden border border-slate-200'>
          <Image
            src={imageUrl}
            fill={true}
            alt=''
            objectFit='cover'
          />
        </div>

        <Spacer direction='col'>
          <SpaceBetween
            firstElement={<MainHeading>{title}</MainHeading>}
            secondElement={
              editUrl ? (
                <>
                  <Link
                    href={editUrl}
                    title={editContentText || 'Näytä'}>
                    <IconButton color='primary'>{editIcon || <Visibility />}</IconButton>
                  </Link>
                </>
              ) : null
            }
          />

          {description}
          <div className='flex justify-end w-full mt-auto'>
            {deleteUrl && (
              <Link
                href={deleteUrl}
                title='Poista'>
                <IconButton color='warning'>
                  <Delete />
                </IconButton>
              </Link>
            )}
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
