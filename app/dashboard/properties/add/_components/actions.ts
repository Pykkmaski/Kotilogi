'use server';

import axios from 'axios';
import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { properties } from 'kotilogi-app/dataAccess/properties';
import { PropertyPayloadType } from 'kotilogi-app/dataAccess/types';
import db from 'kotilogi-app/dbconfig';
import { redirect } from 'next/navigation';
import { z } from 'zod';
require('dotenv').config();

export const updatePropertyAction = async (
  propertyId: string,
  data: Partial<PropertyPayloadType> & Required<Pick<PropertyPayloadType, 'propertyTypeId'>>
) => {
  console.log('Property at update: ', data);
  z.string().parse(propertyId);
  z.object({
    propertyTypeId: z.number(),
  }).parse(data);

  await properties.update(propertyId, data);
  revalidatePath('/dashboard/properties');
};

export const createPropertyAction = async (
  data: PropertyPayloadType & Required<Pick<PropertyPayloadType, 'propertyTypeId'>>
) => {
  z.object({
    propertyTypeId: z.number(),
  }).parse(data);

  let pid;
  await properties.create(data, async (id, trx) => {
    pid = id;
  });

  revalidatePath('/dashboard/properties');
  redirect(`/dashboard/properties/${pid}/`);
};

type InfoType = {
  identifier: string;
  identifierDisplayFormat: string;
  streetAddress: string;
  zipCode: string;
};

/**
 * Hits the MML-api to get information on a property.
 * The purpose of this action is mainly to determine if a property exists based on if data is returned in response to an identifier.
 *  (The api is public, issues may arise if a lot of requests are made)
 * @param propertyIdentifier The kiinteistötunnus of the property to get info on.
 * @returns
 */
export const fetchPropertyInfoAction = async (
  propertyIdentifier: string
): Promise<InfoType | null> => {
  try {
    z.string().parse(propertyIdentifier);

    const apiKey = process.env.MML_API_KEY;
    const authString = `${apiKey}:`;
    const credentials = btoa(authString);

    const url = `https://avoin-paikkatieto.maanmittauslaitos.fi/kiinteisto-avoin/simple-features/v3/collections/PalstanSijaintitiedot/items?kiinteistotunnuksenEsitysmuoto=${propertyIdentifier}`;

    const mmlResponse = await axios.get(url, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    const data = mmlResponse.data;
    if (!data) {
      return null;
    }
    const coordinates = data.features[0].properties.kiinteistotunnuksenSijainti.coordinates;

    //Reverse goecode to get the address
    const reverseGeoCodeResponse = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[1]}&lon=${coordinates[0]}`
    );

    if (!reverseGeoCodeResponse.data) {
      return null;
    }

    const { road: streetAddress, postcode: zipCode } = reverseGeoCodeResponse.data.address;
    const {
      kiinteistotunnus: identifier,
      kiinteistotunnuksenEsitysmuoto: identifierDisplayFormat,
    } = data.features[0].properties;

    return {
      identifier,
      identifierDisplayFormat,
      streetAddress,
      zipCode,
    };
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const getSelectorOptions = async (tablename: string) => {
  return await db(tablename);
};
