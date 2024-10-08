'use client';

import { FileListItemProps } from './FileListItem';
import { ListItem, ListItemProps, ListItemProvider } from './ListItem';
import Link from 'next/link';

function ImageListItem(props: Omit<FileListItemProps, 'icon'>) {
  const imageSrc = `/api/files/${props.item.id}?tableName=${props.tablename}`;

  return (
    <ListItemProvider item={props.item}>
      <div className='relative aspect-square overflow-hidden object-contain rounded-lg lg:w-[200px] xs:w-[45%] flex items-center justify-center shadow-md'>
        <Link
          href={imageSrc}
          target='_blank'>
          <img
            style={{ objectFit: 'contain' }}
            src={imageSrc}></img>
        </Link>

        <div className='absolute top-2 right-2 z-40 aspect-square w-5'>
          <ListItem.CheckBox />
        </div>
      </div>
    </ListItemProvider>
  );
}

export function PropertyImageListItem(props: ListItemProps<Kotidok.FileType>) {
  return (
    <ImageListItem
      {...props}
      tablename='propertyFiles'
      deleteMethod={() => {
        throw new Error('Delete method not implemented!');
      }}
    />
  );
}

export function EventImageListItem(props: ListItemProps<Kotidok.FileType>) {
  return (
    <ImageListItem
      {...props}
      tablename='eventFiles'
      deleteMethod={() => {
        throw new Error('Delete method not implemented!');
      }}
    />
  );
}
