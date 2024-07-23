import { ObjectDataType } from 'kotilogi-app/models/types';
import { SecondaryHeading } from '../Typography/Headings';
import Link from 'next/link';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { OverviewBox } from '../Boxes/OverviewBox';
import { NoUnderlineLink } from '../Links/NoUnderlineLink';
import React from 'react';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';

type OverviewBoxListProps<T extends ObjectDataType> = {
  items: T[];
  listTitle: string;
  itemsSelectable?: boolean;
  addButtonUrl?: string;
  getOverviewBoxDeleteUrl?: (itemId: string) => string;
  getOverviewBoxUrl?: (itemId: string) => string;
  getOverviewBoxTitle?: (item: T, i: number) => string;
  getOverviewBoxDescription?: (item: T, i: number) => string;
  getOverviewBoxImageUrl?: (itemId: string) => string;
};

export function OverviewBoxList<T extends ObjectDataType>({
  items,
  listTitle,
  addButtonUrl,
  itemsSelectable,
  getOverviewBoxDescription,
  getOverviewBoxImageUrl,
  getOverviewBoxUrl,
  getOverviewBoxDeleteUrl,
  getOverviewBoxTitle,
}: OverviewBoxListProps<T>) {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex justify-between w-full items-center'>
        <SecondaryHeading>{listTitle}</SecondaryHeading>
        <div className='flex gap-4 items-center'>
          <Link href={addButtonUrl}>
            <Button
              variant='text'
              startIcon={<Add />}>
              Lisää Uusi
            </Button>
          </Link>
        </div>
      </div>

      <SelectablesProvider>
        {items.map((item, i) => {
          const title =
            (getOverviewBoxTitle && getOverviewBoxTitle(item, i)) || item.title || 'Ei Otsikkoa.';
          const description =
            (getOverviewBoxDescription && getOverviewBoxDescription(item, i)) ||
            item.description ||
            'Ei Kuvausta.';
          const imageUrl =
            (getOverviewBoxImageUrl && getOverviewBoxImageUrl(item.id)) ||
            '/img/Properties/default-bg.jpg';
          const editUrl = getOverviewBoxUrl(item.id);
          const deleteUrl = getOverviewBoxDeleteUrl && getOverviewBoxDeleteUrl(item.id);

          return (
            <OverviewBox
              deleteUrl={deleteUrl}
              editUrl={editUrl}
              key={`listItem-${i}`}
              title={title}
              description={description}
              imageUrl={imageUrl}
              selectableItem={itemsSelectable && item}
            />
          );
        })}
      </SelectablesProvider>
    </div>
  );
}
