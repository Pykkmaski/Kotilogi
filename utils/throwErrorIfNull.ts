import { AcceptedGalleryTypes } from "kotilogi-app/components/Gallery/Types";

export function throwErrorIfNull(data: any, message: string): void{
    if(data === null) throw new Error(message);
}