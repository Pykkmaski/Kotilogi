'use server';
import { utilities } from 'kotilogi-app/features/utilities/DAL/utilities';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const deleteUtilityAction = async (id: string) => {
  z.string().parse(id);
  await utilities.del(id);
  revalidatePath('/dashboard/properties/[propertyId]/');
};
