'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { properties } from 'kotilogi-app/dataAccess/properties';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const deletePropertyAction = async (id: string, password: string) => {
  z.string().parse(id);
  z.string().parse(password);

  await properties.del(id, password);
  revalidatePath('/dashboard');
  redirect(`/dashboard/properties`);
};
