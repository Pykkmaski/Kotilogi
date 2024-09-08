'use server';

import axios from 'axios';
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

export const isPropertyValid = async (propertyIdentifier: string) => {
  try {
    const url = `https://avoin-paikkatieto.maanmittauslaitos.fi/kiinteisto-avoin/simple-features/v3/collections/PalstanSijaintitiedot/items?kiinteistotunnuksenEsitysmuoto=${propertyIdentifier}`;

    const apiKey = process.env.MML_API_KEY;
    const authString = `${apiKey}:`;
    const credentials = btoa(authString);

    await axios.get(url, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    return true;
  } catch (err) {
    return false;
  }
};
