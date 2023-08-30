import { FormEventHandler } from "react";
import { ItemType } from "../Cards/ItemCard";

export type ButtonType = 'add' | 'delete';

export interface GalleryProps{
    content: ItemType[],
}

export interface BodyProps{
    content: any[],
    contentType: 'property' | 'event' | 'file' | 'image',
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

export type ContentType = 'property' | 'event' | 'image' | 'file';

export interface GalleryOptions{
    defaultData: any,
    contentType: ContentType,
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