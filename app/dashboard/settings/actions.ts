import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { deleteUser, updateUser } from 'kotilogi-app/dataAccess/users';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const deleteUserAction = async (password: string) => {
  z.string().parse(password);
  await deleteUser(password);
  return redirect('/logout');
};

export const updateUserAction = async (newData: { email?: string; password?: string }) => {
  z.object({
    email: z.string().email().optional(),
    password: z.string().optional(),
  });

  await updateUser(newData);
  revalidatePath('/dashboard');
};
