'use server';

import { revalidatePath } from "next/cache";
import { upload } from "../file/upload";

export async function addPropertyFiles(files: FormData[], propertyId: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await upload(files, propertyId, 'propertyFiles');
            revalidatePath('/properties/[property_id]/');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}