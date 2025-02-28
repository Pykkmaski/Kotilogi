'use server';

import { PropertyPayloadType } from 'kotilogi-app/dataAccess/types';
import { properties } from '../DAL/properties';
import { revalidatePath } from 'next/cache';
import z from 'zod';

/**Updates a property by calling the update-method on the properties DAL. Revalidates property-routes on success. */
export const updatePropertyAction = async (
  propertyId: string,
  data: Partial<PropertyPayloadType> & Required<Pick<PropertyPayloadType, 'property_type_id'>>
) => {
  z.string().parse(propertyId);
  z.object({
    property_type_id: z.number(),
  }).parse(data);

  const result = await properties.update(propertyId, data);
  if (result.code === 0) {
    revalidatePath('/dashboard/properties');
  }
  return result;
};
