'use server';

import { users } from 'kotilogi-app/utils/users';
import { revalidatePath } from 'next/cache';

export async function updateUserEmail(oldEmail: string, newEmail: string) {
  await users.updateEmail(oldEmail, newEmail);
  revalidatePath('/dashboard/settings');
}

export async function updateUserPassword(email: string, oldPassword: string, newPassword: string) {
  const result = await users.updatePassword(email, oldPassword, newPassword);
  return result;
}

export async function registerUser(credentials: { email: string; password: string; plan: string }) {
  return await users.registerUser(credentials);
}
