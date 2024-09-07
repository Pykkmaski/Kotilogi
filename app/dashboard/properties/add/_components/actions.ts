'use server';

import { createProperty, updateProperty } from 'kotilogi-app/dataAccess/properties';

export const runUpdate = async (propertyId, data) => await updateProperty(propertyId, data as TODO);
export const onSubmit = async data => {
  await createProperty(data as TODO);
};
