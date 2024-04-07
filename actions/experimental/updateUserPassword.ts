import { Users } from "kotilogi-app/utils/users";

export async function updateUserPassword(email: string, oldPassword: string, newPassword: string){
    const users = new Users();
    await users.updatePassword(email, oldPassword, newPassword);
}