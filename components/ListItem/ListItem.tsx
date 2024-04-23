'use client';

import { createContext } from 'react';
import style from './style.module.scss';
import React from 'react';
import { useGalleryContext } from '../new/Gallery/GalleryBase/Gallery';
import { useListItemContext } from './ListItem.hooks';
import { useSelectablesProviderContext } from '../Util/SelectablesProvider';

export type ListItemProps<T extends Kotidok.ItemType> = React.PropsWithChildren & {
  item: T;
  selected?: boolean;
};

type ListItemContextProps = {
  item: unknown;
  selected?: boolean;
};

export const ListItemContext = createContext<ListItemContextProps | null>(null);

export function ListItemProvider<T extends Kotidok.ItemType>({
  children,
  ...props
}: ListItemProps<T>) {
  return (
    <ListItemContext.Provider
      value={{
        item: props.item,
        selected: props.selected,
      }}>
      {children}
    </ListItemContext.Provider>
  );
}

export function ListItem<T extends Kotidok.ItemType>({ children, ...props }: ListItemProps<T>) {
  const className = [
    'w-full flex rounded-md shadow-lg p-2 border hover:border-orange-500',
    props.selected ? 'bg-orange-100 border-orange-500' : 'bg-transparent border-slate-200 bg-white',
  ];

  //const classes = props.selected ? [style.container, style.selected] : [style.container];
  //const className = classes.join(' ');

  return (
    <ListItemProvider item={props.item} selected={props.selected}>
      <div className={className.join(' ')}>{children}</div>
    </ListItemProvider>
  );
}

ListItem.Body = function ({ children }) {
  const { item } = useListItemContext();

  return <div className='flex-1'>{children}</div>;
};

ListItem.Header = function ({ children }) {
  return <div className='w-full items-center flex justify-between text-black'>{children}</div>;
};

ListItem.Footer = function ({ children }) {
  return <div className='w-full flex items-center text-slate-400 mt-4'>{children}</div>;
};

ListItem.Controls = function ({ children }) {
  return <div className='flex h-full justify-self-end'>{children}</div>;
};

ListItem.Description = function ({ children }) {
  return <div className='text-slate-500'>{children}</div>;
};

type CheckBoxProps = {
  checked?: boolean;
};

ListItem.CheckBox = function ({ checked }: CheckBoxProps) {
  const { selectItem, selectedItems } = useSelectablesProviderContext();
  const { item } = useListItemContext();
  const selected = selectedItems.includes(item);

  console.log(selected);
  return (
    <input
      className='aspect-square xs:w-[1.5rem] lg:w-4'
      type='checkbox'
      onChange={() => selectItem(item)}
      checked={selected}
    />
  );
};
