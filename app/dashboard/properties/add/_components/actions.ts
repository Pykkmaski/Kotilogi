'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { createProperty, updateProperty } from 'kotilogi-app/dataAccess/properties';

export const runUpdate = async (propertyId, data) => {
  await updateProperty(propertyId, data as TODO);
  revalidatePath('/dashboard/properties');
};
export const onSubmit = async data => {
  await createProperty(data as TODO);
  revalidatePath('/dashboard/properties');
};
