'use client';

import { deletePropertyFiles } from "kotilogi-app/actions/property/deletePropertyFiles";
import { FileListItemProps } from "./FileListItem";
import { ListItemProps } from "./ListItem";
import { deleteEventFiles } from "kotilogi-app/actions/propertyEvent/deleteEventFiles";
import Link from "next/link";

function ImageListItem(props: Omit<FileListItemProps, 'icon'>){

    const imageSrc = `/api/files/${props.item.id}?tableName=${props.tablename}`;

    return (
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
    );
}

export function PropertyImageListItem(props: ListItemProps<Kotilogi.FileType>){
    return (
        <ImageListItem {...props} tablename="propertyFiles" deleteMethod={() => deletePropertyFiles([props.item])}/>
    );
}

export function EventImageListItem(props: ListItemProps<Kotilogi.FileType>){
    return (
        <ImageListItem {...props} tablename="eventFiles" deleteMethod={() => deleteEventFiles([props.item])} />
    );
}