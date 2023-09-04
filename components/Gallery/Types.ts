import { FormEvent, FormEventHandler } from "react";
import { ItemType } from "../Cards/ItemCard";
import { PropertyType } from "kotilogi-app/types/PropertyType";
import { EventType } from "kotilogi-app/types/EventType";

export type ButtonType = 'add' | 'delete';

export interface GalleryProps{
    content: ItemType[],
}

export interface BodyProps{
    content: any[],
    contentTarget: ContentType,
    error: any,
}

export type AcceptType = 'application/pdf' | 'image/jpeg' | undefined;

export type SelectOptions = {
    text: string,
    value: string | number | null,
    defaultSelected?: boolean
}

export interface FormField{
    type: string,
    label: string,
    name: string,
    sublabel?: string,
    required?: boolean,
    accept?: AcceptType,
    defaultValue?: string,
    options?: SelectOptions[],
}

export interface ModalOptions{
    headerText: string,
    bodyText?: string,
    fields?: FormField[],
}

export type ContentType = 'properties' | 'property_events' | 'property_files' | 'event_files' | 'property_images' | 'event_images';

export interface GalleryOptions{
    defaultData: any,
    contentTarget: ContentType,
    header: HeaderOptions,
    contentError: JSX.Element,
}

export interface Button{
    type: ButtonType,
    modalOptions: ModalOptions,
}

export interface HeaderProps{
    title: string,
    subtitle?: string,
    buttons: Button[],
}

export interface HeaderOptions{
    title: string,
    subtitle?: string,
    buttons: Button[],
}

export type AcceptedGalleryTypes = PropertyType | EventType;