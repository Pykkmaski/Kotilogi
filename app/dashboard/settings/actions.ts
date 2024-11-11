'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { users } from 'kotilogi-app/dataAccess/users';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const deleteUserAction = async (password: string) => {
  z.string().parse(password);

  const session = await verifySession();
  await users.del(session.user.id, password);
  return redirect('/logout');
};

export const updateUserAction = async (newData: { email?: string; password?: string }) => {
  z.object({
    email: z.string().email().optional(),
    password: z.string().optional(),
  });

  await users.update(newData);
  revalidatePath('/dashboard');
};
