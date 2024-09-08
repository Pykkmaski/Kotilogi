import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

require('dotenv').config();

export async function GET(req: NextRequest) {
  try {
    const propertyIdentifier = req.nextUrl.searchParams.get('propertyIdentifier');
    if (!propertyIdentifier) {
      return new NextResponse('Pyynnöstä puuttuu kiinteistötunnus!');
    }

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
    const roadName = reverseGeoCodeResponse.data.address.road;
    const identifier = data.features[0].properties.kiinteistotunnus;
    const identifierDisplayFormat = data.features[0].properties.kiinteistotunnuksenEsitysmuoto;
    return NextResponse.json({
      identifier,
      identifierDisplayFormat,
      roadName,
    });
  } catch (err: any) {
    console.error(err.message);

    const status = (err.response && err.response.status) || 500;
    const statusText = err.response && err.response.statusText;

    return new NextResponse(err.message, { status, statusText });
  }
}
