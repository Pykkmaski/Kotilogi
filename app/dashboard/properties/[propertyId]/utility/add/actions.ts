'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { UtilityDataType } from 'kotilogi-app/dataAccess/types';
import { utilities } from 'kotilogi-app/dataAccess/utilities';

export const createUtilityDataAction = async (
  propertyId: string,
  entries: Partial<UtilityDataType>[]
) => {
  const dataToInsert = entries.map(e => ({ ...e, property_id: propertyId }));
  const promises = dataToInsert.map(data => utilities.create(data));
  await Promise.all(promises);
  revalidatePath('/dashboard/properties');
};
