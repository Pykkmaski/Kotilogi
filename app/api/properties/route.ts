import db from 'kotilogi-app/dbconfig';
import { deleteObject } from 'kotilogi-app/models/objectData';
import { createProperty, getProperty, updateProperty } from 'kotilogi-app/models/propertyData';
import { PropertyDataType } from 'kotilogi-app/models/types';
import { filterValidColumns } from 'kotilogi-app/models/utils/filterValidColumns';
import { getTableColumns } from 'kotilogi-app/models/utils/getTableColumns';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { searchParamsToObject } from 'kotilogi-app/utils/searchParamsToObject';

const TABLENAME = 'data_properties';
const HOUSES_TABLENAME = 'data_houses';
const APTS_TABLENAME = 'data_appartments';
const PROPERTY_TYPES_TABLENAME = 'ref_propertyTypes';
const getTableNameFromPropertyType = (typeLabel: string) =>
  typeLabel == 'Kiinteistö' ? HOUSES_TABLENAME : APTS_TABLENAME;

export async function GET(req: Request) {
  try {
    const { q, ...query } = searchParamsToObject(new URL(req.url).searchParams);

    const property = await getProperty(query.id);
    return new NextResponse(JSON.stringify(property));
  } catch (err) {
    console.log(err.message);
    return new NextResponse(null, {
      status: 500,
      statusText: err.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { data, files } = (await req.json()) as {
      data: PropertyDataType & Required<Pick<PropertyDataType, 'parentId'>>;
      files?: FormData[];
    };

    await createProperty(data, async (propertyId, trx) => {
      const [typeLabel] = await trx(PROPERTY_TYPES_TABLENAME)
        .where({ id: data.propertyTypeId })
        .pluck('name');

      const tableName = getTableNameFromPropertyType(typeLabel);
      const insertObj = filterValidColumns(data, await getTableColumns(tableName, trx));

      await trx(tableName).insert({
        ...insertObj,
        id: propertyId,
      });

      if (files) {
        //Upload any files.
      }
    });
    revalidatePath('/newDashboard/properties');
    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, data } = await req.json();

    await updateProperty(id, data);

    revalidatePath('/newDashboard');
    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await loadSession();
    const { propertyId, password } = await req.json();
    const owners = await db('data_propertyOwners').where({ propertyId });
    if (!owners.includes(session.user.id)) {
      return new NextResponse('Vain talon omistajalla on oikeus poistaa se!', { status: 403 });
    }

    const [encryptedPassword] = await db('data_users')
      .where({ id: session.user.id })
      .pluck('password');
    const ok = await bcrypt.compare(password, encryptedPassword);

    if (!ok) {
      return new NextResponse('Käyttäjätilin salasana on väärä!', { status: 403 });
    }

    await deleteObject(propertyId);
    revalidatePath('/newDashboard');
    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
}
