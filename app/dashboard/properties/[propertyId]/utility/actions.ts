'use server';

import { deleteUtilityData } from 'kotilogi-app/dataAccess/utilities';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const deleteUtilityAction = async (id: string) => {
  z.string().parse(id);
  await deleteUtilityData(id);
  revalidatePath('/dashboard/properties/[propertyId]/');
};
