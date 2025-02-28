'use server';

import { files } from 'kotilogi-app/dataAccess/files';
import { events } from '../DAL/events';
import { EventPayloadType } from '../types/EventPayloadType';
import { revalidatePath } from 'next/cache';
import z from 'zod';

export const createEventAction = async (
  propertyId: string,
  eventPayload: EventPayloadType,
  fileFormData?: FormData[]
) => {
  z.string().uuid().parse(propertyId);
  const result = await events.create({ ...eventPayload, property_id: propertyId });

  if (fileFormData) {
    try {
      const fdata = fileFormData.map(fd => fd.get('file') as unknown as File);
      await files.upload(fdata, result.data);
      await files.setDefaultMainImage(result.data);
    } catch (err) {
      //Ignore file upload errors for now.
      console.error(err.message);
    }
  }

  if (result.code === 0) {
    revalidatePath('/dashboard/properties/[propertyId]');
  }

  return result;
};
