'use client';

import { deletePropertyFiles } from "kotilogi-app/actions/property/deletePropertyFiles";
import { FileListItemProps } from "./FileListItem";
import { ListItemProps, ListItemProvider } from "./ListItem";
import { deleteEventFiles } from "kotilogi-app/actions/propertyEvent/deleteEventFiles";
import Link from "next/link";
import { CheckBox } from "./ListItem.components";
import * as properties from '@/actions/properties';
import * as events from '@/actions/events';

function ImageListItem(props: Omit<FileListItemProps, 'icon'>){

    const imageSrc = `/api/files/${props.item.id}?tableName=${props.tablename}`;

    return (
        <ListItemProvider item={props.item}>
            <div className="relative">
                <Link href={imageSrc} target="_blank" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '12rem',
                    aspectRatio: '1/1',
                    border: '1px solid #DDD',
                    borderRadius: '10px',
                    objectFit: 'contain',
                    overflow: 'hidden',
                }}>
                    <img style={{objectFit: 'contain'}} src={imageSrc}></img>
                </Link>

                <div className="absolute top-2 right-2 z-40 aspect-square w-5">
                    <CheckBox/>
                </div>
            </div>
        </ListItemProvider>
        
    );
}

export function PropertyImageListItem(props: ListItemProps<Kotilogi.FileType>){
    return (
        <ImageListItem {...props} tablename="propertyFiles" deleteMethod={() => properties.deleteFile(props.item)}/>
    );
}

export function EventImageListItem(props: ListItemProps<Kotilogi.FileType>){
    return (
        <ImageListItem {...props} tablename="eventFiles" deleteMethod={() => events.deleteFile(props.item)} />
    );
}