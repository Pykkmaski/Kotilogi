'use server';

import axios from 'axios';
import z from 'zod';
require('dotenv').config();
type InfoType = {
  identifier: string;
  identifierDisplayFormat: string;
  street_name: string;
  zip_code: string;
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

    const { road: street_name, postcode: zip_code } = reverseGeoCodeResponse.data.address;
    const {
      kiinteistotunnus: identifier,
      kiinteistotunnuksenEsitysmuoto: identifierDisplayFormat,
    } = data.features[0].properties;

    return {
      identifier,
      identifierDisplayFormat,
      street_name,
      zip_code,
    };
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
