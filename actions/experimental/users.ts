'use server';

import { Users } from "kotilogi-app/utils/users";
import { revalidatePath } from "next/cache";

export async function updateUserEmail(currentEmail: string, newEmail: string){
    const users = new Users('users');
    await users.updateEmail(currentEmail, newEmail);
    revalidatePath('/dashboard/settings');
}

export async function updateUserPassword(email: string, oldPassword: string, newPassword: string){
    const users = new Users('users');
    console.log(oldPassword, newPassword);
    const result = await users.updatePassword(email, oldPassword, newPassword);
    return result;
}