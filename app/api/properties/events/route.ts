import { createObject } from 'kotilogi-app/models/objectData';
import { createPropertyEvent, getEvents } from 'kotilogi-app/models/propertyEventData';
import { searchParamsToObject } from 'kotilogi-app/utils/searchParamsToObject';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const query = new URL(req.url).searchParams;
    const { q, ...queryObject } = searchParamsToObject(query);
    const events = await getEvents(queryObject, q);

    return new NextResponse(JSON.stringify(events), { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { data, files } = await req.json();
    await createPropertyEvent(data, async (obj, trx) => {
      //Upload any files here
      if (files) {
        //TODO
      }
    });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
}
