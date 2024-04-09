'use client';

import { ListItem, ListItemProps } from "./ListItem";
import { CheckBox, ControlsContainer, InfoContainer, TitleContainer } from "./ListItem.components";
import {deleteFile as deletePropertyFile} from '@/actions/experimental/properties';
import {deleteFile as deleteEventFile} from '@/actions/experimental/events';

export type FileListItemProps = ListItemProps<Kotilogi.FileType> & {
    icon: string,
    tablename: 'propertyFiles' | 'eventFiles',
    deleteMethod: () => Promise<void>,
}

function FileListItem({icon, tablename, ...props}: FileListItemProps){
    return (
        <ListItem<Kotilogi.FileType> {...props}>
            <InfoContainer target="_blank" href={`/api/files/${props.item.id}?tableName=${tablename}`}>
                <TitleContainer titleText={props.item.fileName} iconSrc={icon}/>
            </InfoContainer>

            <ControlsContainer>
                <CheckBox/>
            </ControlsContainer>
        </ListItem>
    );
}

type PdfListItemProps = ListItemProps<Kotilogi.FileType> & {
    tablename: 'propertyFiles' | 'eventFiles',
    deleteMethod: () => Promise<void>,
}

function PdfListItem(props: PdfListItemProps){
    return (
        <FileListItem {...props} icon="/icons/copy.png"/>
    );
}

export function PropertyFileListItem(props: ListItemProps<Kotilogi.FileType>){
    return (
        <PdfListItem {...props} tablename='propertyFiles'
            deleteMethod={() => deletePropertyFile(props.item.id)}/>
    );
}

export function EventFileListItem(props: ListItemProps<Kotilogi.FileType>){
    return (
        <PdfListItem {...props} tablename='eventFiles'
            deleteMethod={() => deleteEventFile(props.item.id)}/>
    );
}