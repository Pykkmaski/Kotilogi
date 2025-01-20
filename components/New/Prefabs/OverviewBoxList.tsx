import { ObjectDataType } from 'kotilogi-app/dataAccess/types';
import { SecondaryHeading } from '../Typography/Headings';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import React, { ReactNode } from 'react';
import { SearchBar } from '@/components/Feature/SearchBar';
import colors from 'kotilogi-app/colors';
import { Button } from '../Button';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';

type ListHeaderProps = {
  searchBar?: boolean;
  title: ReactNode;
  addButtonUrl: string;
};

export function ListHeader({ searchBar, title, addButtonUrl }: ListHeaderProps) {
  const containerClasses = [
    'flex lg:flex-row justify-between w-full lg:items-center xs:items-start xs:mb-2',
    searchBar ? 'xs:flex-col' : 'xs:flex-row',
  ];

  return (
    <div className={containerClasses.join(' ')}>
      <SecondaryHeading>{title}</SecondaryHeading>
      <div className='flex xs:gap-2 md:gap-4 items-center xs:w-full lg:w-auto xs:mt-2 xl:mt-0'>
        <RenderOnCondition condition={searchBar}>
          <SearchBar />
        </RenderOnCondition>

        <Link href={addButtonUrl}>
          <div className='lg:block xs:hidden'>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<Add />}>
              Lisää Uusi
            </Button>
          </div>

          <div className='xs:block lg:hidden'>
            <IconButton size='small'>
              <Add sx={{ color: colors.secondary }} />
            </IconButton>
          </div>
        </Link>
      </div>
    </div>
  );
}

type OverviewBoxListProps<T extends ObjectDataType> = {
  items: T[];
  listTitle: ReactNode;
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
      <ListHeader
        title={listTitle}
        searchBar
        addButtonUrl={addButtonUrl}
      />
      <RenderOnCondition
        condition={items.length}
        fallback={onEmptyElement}>
        {items.map((item, i) => {
          return (
            <OverviewComponent
              item={item}
              key={`listItem-${i}`}
            />
          );
        })}
      </RenderOnCondition>
    </div>
  );
}
