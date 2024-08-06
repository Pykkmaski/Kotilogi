import { ObjectDataType } from 'kotilogi-app/models/types';
import { SecondaryHeading } from '../Typography/Headings';
import Link from 'next/link';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { OverviewBox } from '../Boxes/OverviewBox';
import { NoUnderlineLink } from '../Links/NoUnderlineLink';
import React from 'react';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { SearchBar } from '@/components/Feature/SearchBar';

type OverviewBoxListProps<T extends ObjectDataType> = {
  items: T[];
  listTitle: string;
  itemsSelectable?: boolean;
  searchBar?: boolean;
  addButtonUrl?: string;
  onEmptyElement?: React.ReactNode;

  OverviewComponent: ({ item }: { item: T }) => React.ReactNode;
};

export function OverviewBoxList<T extends ObjectDataType>({
  items,
  listTitle,
  addButtonUrl,
  itemsSelectable,
  searchBar,
  onEmptyElement,

  OverviewComponent,
}: OverviewBoxListProps<T>) {
  return (
    <div className='flex flex-col md:gap-4 xs:gap-1 w-full'>
      <div className='flex justify-between w-full items-center'>
        <SecondaryHeading>{listTitle}</SecondaryHeading>
        <div className='flex gap-4 items-center'>
          {searchBar && <SearchBar />}
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
        {items.length
          ? items.map((item, i) => {
              return (
                <OverviewComponent
                  item={item}
                  key={`listItem-${i}`}
                />
              );
            })
          : onEmptyElement}
      </SelectablesProvider>
    </div>
  );
}
