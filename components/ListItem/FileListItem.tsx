'use client';

import { ListItem, ListItemProps } from './ListItem';
import { ControlsContainer, InfoContainer, TitleContainer } from './ListItem.components';
import { deleteFile as deletePropertyFile } from '@/actions/experimental/properties';
import { deleteFile as deleteEventFile } from '@/actions/experimental/events';
import Link from 'next/link';

export type FileListItemProps = ListItemProps<Kotilogi.FileType> & {
  icon: string;
  tablename: 'propertyFiles' | 'eventFiles';
  deleteMethod: () => Promise<void>;
};

function FileListItem({ icon, tablename, ...props }: FileListItemProps) {
  return (
    <ListItem<Kotilogi.FileType> {...props}>
      <Link target='_blank' href={`/api/files/${props.item.id}?tableName=${tablename}`} className='flex-1 items-center flex'>
        <ListItem.Body>
          <ListItem.Header>
            <div className='flex gap-4 items-center'>
              <i className='fa fa-copy' />
              <h1>{props.item.title}</h1>
            </div>
          </ListItem.Header>
        </ListItem.Body>
      </Link>

      <ListItem.Controls>
        <ListItem.CheckBox />
      </ListItem.Controls>
    </ListItem>
  );
}

type PdfListItemProps = ListItemProps<Kotilogi.FileType> & {
  tablename: 'propertyFiles' | 'eventFiles';
  deleteMethod: () => Promise<void>;
};

function PdfListItem(props: PdfListItemProps) {
  return <FileListItem {...props} icon='/icons/copy.png' />;
}

export function PropertyFileListItem(props: ListItemProps<Kotilogi.FileType>) {
  return <PdfListItem {...props} tablename='propertyFiles' deleteMethod={() => deletePropertyFile(props.item.id)} />;
}

export function EventFileListItem(props: ListItemProps<Kotilogi.FileType>) {
  return <PdfListItem {...props} tablename='eventFiles' deleteMethod={() => deleteEventFile(props.item.id)} />;
}
