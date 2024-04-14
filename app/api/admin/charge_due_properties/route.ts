import db from 'kotilogi-app/dbconfig';
import { bills } from 'kotilogi-app/utils/bills';
import { createDueDate } from 'kotilogi-app/utils/createDueDate';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorization } from '../_utils/verifyAuthorization';

async function createCharges() {
  const stream = db('properties').select('*').stream();

  var billsCreated = 0;

  for await (const property of stream) {
    const timeSinceCreation = Date.now() - parseInt(property.createdAt);
    const year = 1000 * 60 * 60 * 24 * 365;
    const result = timeSinceCreation % year;

    if (result === 0) {
      await db('bills').insert({
        due: createDueDate(30),
        targetId: property.id,
        customer: property.refId,
        amount: 990,
        stamp: 'charge_property',
      });

      billsCreated++;
      console.log(billsCreated);
    }
  }

  return billsCreated;
}

export async function POST(req: NextRequest) {
  try {
    const authorized = verifyAuthorization(req);
    if (!authorized) {
      return new NextResponse('Request unauthorized!', {
        status: 401,
      });
    }

    const billsCreated = await createCharges();

    return new NextResponse(`Created annual bills for ${billsCreated} properties!`, {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);

    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
