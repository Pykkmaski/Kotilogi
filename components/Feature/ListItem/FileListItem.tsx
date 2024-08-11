'use client';

import { ListItem, ListItemProps } from './ListItem';
import Link from 'next/link';
import { SelectablesProvider } from '../../Util/SelectablesProvider';

export type FileListItemProps = ListItemProps<Kotidok.FileType> & {
  icon: string;
  tablename: 'propertyFiles' | 'eventFiles';
  deleteMethod: () => Promise<void>;
};

function FileListItem({ icon, tablename, ...props }: FileListItemProps) {
  return (
    <ListItem<Kotidok.FileType> {...props}>
      <Link
        target='_blank'
        href={`/api/files/${props.item.id}?tableName=${tablename}`}
        className='flex-1 items-center flex'>
        <ListItem.Body>
          <ListItem.Header>
            <div className='flex gap-4 items-center'>
              <i className='fa fa-copy' />
              <h1>{props.item.title.split('--')[1]}</h1>
            </div>
          </ListItem.Header>
        </ListItem.Body>
      </Link>

      <ListItem.Controls>
        <SelectablesProvider.SelectTrigger item={props.item}>
          <input
            type='checkbox'
            className='w-[20px] aspect-square'
          />
        </SelectablesProvider.SelectTrigger>
      </ListItem.Controls>
    </ListItem>
  );
}

type PdfListItemProps = ListItemProps<Kotidok.FileType> & {
  tablename: 'propertyFiles' | 'eventFiles';
  deleteMethod: () => Promise<void>;
};

function PdfListItem(props: PdfListItemProps) {
  return (
    <FileListItem
      {...props}
      icon='/icons/copy.png'
    />
  );
}

export function PropertyFileListItem(props: ListItemProps<Kotidok.FileType>) {
  return (
    <PdfListItem
      {...props}
      tablename='propertyFiles'
      deleteMethod={() => {
        throw new Error('Delete method not implemented!');
      }}
    />
  );
}

export function EventFileListItem(props: ListItemProps<Kotidok.FileType>) {
  return (
    <PdfListItem
      {...props}
      tablename='eventFiles'
      deleteMethod={() => {
        throw new Error('Delete method not implemented!');
      }}
    />
  );
}
