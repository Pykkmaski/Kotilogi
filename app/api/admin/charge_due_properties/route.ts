import db from 'kotilogi-app/dbconfig';
import { bills } from 'kotilogi-app/utils/bills';
import { createDueDate } from 'kotilogi-app/utils/createDueDate';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthorization } from '../_utils/verifyAuthorization';

async function createCharges() {
  const trx = await db.transaction();
  try {
    const stream = trx('properties').select('*').stream();

    var billsCreated = 0;

    for await (const property of stream) {
      const propertyCreationDate = new Date(property.createdAt);
      console.log(propertyCreationDate);
      const creationMonth = propertyCreationDate.getMonth();
      const creationYear = propertyCreationDate.getFullYear();

      const currentDate = new Date();
      console.log(creationMonth, creationYear, currentDate.getMonth());
      if (currentDate.getMonth() == creationMonth && currentDate.getFullYear() > creationYear) {
        //TODO: Do not create duplicate bills for the same property.
        const [previousBill] = await trx('bills').where({
          stamp: 'charge_property',
          targetId: property.id,
        });

        if (previousBill) continue;

        await trx('bills').insert({
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

    await trx.commit();
    return billsCreated;
  } catch (err) {
    await trx.rollback();
    throw err;
  }
}

/**
 * Charges users for every property they have, that are a year old since the last time.
 * @param req
 * @returns
 */
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
