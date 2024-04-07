'use server';

import { Files } from "kotilogi-app/utils/files";
import { revalidatePath } from "next/cache";

export async function deleteFile(tablename: 'propertyFiles' | 'eventFiles', fileName: string){
    const files = new Files();
    await files.deleteFile(tablename, fileName);
    const path = tablename === 'propertyFiles' ? '/properties/[property_id]/' : '/events/[event_id]/';
    revalidatePath(path);
}