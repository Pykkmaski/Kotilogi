import { ObjectDataType } from 'kotilogi-app/dataAccess/types';
import { SecondaryHeading } from '../Typography/Headings';
import Link from 'next/link';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { OverviewBox } from '../Boxes/OverviewBox';
import { NoUnderlineLink } from '../Links/NoUnderlineLink';
import React from 'react';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { SearchBar } from '@/components/Feature/SearchBar';
import colors from 'kotilogi-app/colors';

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
  const getHeader = () => {
    const containerClasses = [
      'flex lg:flex-row justify-between w-full lg:items-center xs:items-start xs:mb-2',
      searchBar ? 'xs:flex-col' : 'xs:flex-row',
    ];
    return (
      <div className={containerClasses.join(' ')}>
        <SecondaryHeading>{listTitle}</SecondaryHeading>
        <div className='flex gap-4 items-center xs:w-full lg:w-auto xs:mt-2 xl:mt-0'>
          {searchBar && <SearchBar />}
          <Link href={addButtonUrl}>
            <div className='lg:block xs:hidden'>
              <Button
                variant='contained'
                size='small'
                startIcon={<Add />}>
                Lisää Uusi
              </Button>
            </div>

            <div className='xs:block lg:hidden'>
              <IconButton size='small'>
                <Add sx={{ color: colors.primary }} />
              </IconButton>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col md:gap-4 xs:gap-1 w-full'>
      {getHeader()}
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
