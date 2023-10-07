'use server';

import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import { revalidatePath } from "next/cache";

export default async function updateInfo(currentData, propertyId){
    await serverUpdateDataById(currentData, propertyId, 'properties');
    revalidatePath('/properties/[id]/info');
}