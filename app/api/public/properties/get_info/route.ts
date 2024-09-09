import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

require('dotenv').config();

export async function GET(req: NextRequest) {
  try {
    const propertyIdentifier = req.nextUrl.searchParams.get('propertyIdentifier');
    const url = `https://avoin-paikkatieto.maanmittauslaitos.fi/kiinteisto-avoin/simple-features/v3/collections/PalstanSijaintitiedot/items?kiinteistotunnuksenEsitysmuoto=${propertyIdentifier}`;

    const apiKey = process.env.MML_API_KEY;
    const authString = `${apiKey}:`;
    const credentials = btoa(authString);

    const mmlResponse = await axios.get(url, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    const data = mmlResponse.data;
    const coordinates = data.features[0].properties.kiinteistotunnuksenSijainti.coordinates;

    //Reverse goecode to get the address
    const reverseGeoCodeResponse = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[1]}&lon=${coordinates[0]}`
    );

    const { road: streetAddress, postcode: zipCode } = reverseGeoCodeResponse.data.address;
    const {
      kiinteistotunnus: identifier,
      kiinteistotunnuksenEsitysmuoto: identifierDisplayFormat,
    } = data.features[0].properties;

    return NextResponse.json({
      identifier,
      identifierDisplayFormat,
      streetAddress,
      zipCode,
    });
  } catch (err: any) {
    console.error(err.message);

    const status = (err.response && err.response.status) || 500;
    const statusText = err.response && err.response.statusText;

    return new NextResponse(err.message, { status, statusText });
  }
}
