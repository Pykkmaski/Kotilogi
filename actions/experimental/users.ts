'use server';

import { users } from 'kotilogi-app/utils/users';
import { revalidatePath } from 'next/cache';

export async function updateUserEmail(userId: number, newEmail: string) {
  await users.updateEmail(userId, newEmail);
  revalidatePath('/dashboard/settings');
}

export async function updateUserPassword(userId: number, oldPassword: string, newPassword: string) {
  const result = await users.updatePassword(userId, oldPassword, newPassword);
  return result;
}

export async function registerUser(credentials: { email: string; password: string; plan: string }) {
  return await users.registerUser(credentials);
}
