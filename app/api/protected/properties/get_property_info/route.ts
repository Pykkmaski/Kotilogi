import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

require('dotenv').config();

export async function POST(req: NextRequest) {
  try {
    const { propertyIdentifier } = await req.json();
    const url = ` https://avoin-paikkatieto.maanmittauslaitos.fi/kiinteisto-avoin/simple-features/v3/collections/PalstanSijaintitiedot/items?kiinteistotunnus=${propertyIdentifier}`;

    const credentials = btoa(`${process.env.MML_API_KEY}:`);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    const data = response.data;
    if (data.features.length) {
      const address = data.features[0].properties.osoitenimi;
      console.log(address);
    } else {
      console.log('No data found for identifier ' + propertyIdentifier);
    }

    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
}
