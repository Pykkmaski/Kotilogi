'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import { createUtilityData } from 'kotilogi-app/dataAccess/utilityData';

export const onSubmit = async (propertyId: string, entries: Partial<UtilityDataType>[]) => {
  const dataToInsert = entries.map(e => ({ ...e, parentId: propertyId }));
  const promises = dataToInsert.map(data => createUtilityData(data));
  await Promise.all(promises);
  revalidatePath('/dashboard/properties');
};
