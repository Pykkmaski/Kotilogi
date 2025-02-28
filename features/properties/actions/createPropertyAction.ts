'use server';

import { properties } from '../DAL/properties';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { PropertyPayloadType } from '../types/PropertyPayloadType';

export const createPropertyAction = async (
  data: PropertyPayloadType & Required<Pick<PropertyPayloadType, 'property_type_id'>>
) => {
  z.object({
    property_type_id: z.number(),
  }).parse(data);

  const result = await properties.create(data);
  if (result.code === 0) {
    revalidatePath('/dashboard/properties');
  }
  return result;
};
