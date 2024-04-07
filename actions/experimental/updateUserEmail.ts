import { Users } from "kotilogi-app/utils/users";
import { revalidatePath } from "next/cache";

export async function updateUserEmail(currentEmail: string, newEmail: string){
    const users = new Users();
    await users.updateEmail(currentEmail, newEmail);
    revalidatePath('/dashboard/settings');
}