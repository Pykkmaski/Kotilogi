'use client';

import { FileListItemProps } from "./FileListItem";
import { ListItem, ListItemProps, ListItemProvider } from "./ListItem";
import Link from "next/link";
import {deleteFile as deletePropertyFile} from '@/actions/experimental/properties';
import {deleteFile as deleteEventFile} from '@/actions/experimental/events';

function ImageListItem(props: Omit<FileListItemProps, 'icon'>){

    const imageSrc = `/api/files/${props.item.id}?tableName=${props.tablename}`;

    return (
        <ListItemProvider item={props.item}>
            <div className="relative aspect-square overflow-hidden object-contain rounded-lg w-[200px] flex items-center justify-center shadow-md">
                <Link href={imageSrc} target="_blank">
                    <img style={{objectFit: 'contain'}} src={imageSrc}></img>
                </Link>

                <div className="absolute top-2 right-2 z-40 aspect-square w-5">
                    <ListItem.CheckBox/>
                </div>
            </div>
        </ListItemProvider>
        
    );
}

export function PropertyImageListItem(props: ListItemProps<Kotilogi.FileType>){
    return (
        <ImageListItem {...props} tablename="propertyFiles" deleteMethod={() => deletePropertyFile(props.item.id)}/>
    );
}

export function EventImageListItem(props: ListItemProps<Kotilogi.FileType>){
    return (
        <ImageListItem {...props} tablename="eventFiles" deleteMethod={() => deleteEventFile(props.item.id)} />
    );
}