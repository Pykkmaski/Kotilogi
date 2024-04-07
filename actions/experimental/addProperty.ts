'use server';

import { Properties } from "kotilogi-app/utils/properties";
import { revalidatePath } from "next/cache";

export async function addProperty(property: Kotilogi.PropertyType, files?: FormData[]){
    const properties = new Properties();
    await properties.addProperty(property, files?.map(file => file.get('file') as unknown as File));
    revalidatePath('/dashboard/properties');
}