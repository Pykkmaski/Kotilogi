import db from 'kotilogi-app/dbconfig';
import { deleteObject } from 'kotilogi-app/models/objectData';
import { createProperty, getProperty, updateProperty } from 'kotilogi-app/models/propertyData';
import { PropertyDataType } from 'kotilogi-app/models/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { searchParamsToObject } from 'kotilogi-app/utils/searchParamsToObject';
import z from 'zod';
import { response } from '../../_utils/responseUtils';

export async function GET(req: Request) {
  try {
    const { q, ...query } = searchParamsToObject(new URL(req.url).searchParams);

    const property = await getProperty(query.id);
    return response('success', JSON.stringify(property));
  } catch (err) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as PropertyDataType &
      Required<Pick<PropertyDataType, 'parentId'>>;

    z.object({
      authorId: z.string(),
    }).parse(data);

    await createProperty(data);
    revalidatePath('/newDashboard/properties');
    return response('success', null, 'Talon lisäys onnistui!');
  } catch (err: any) {
    const msg = err.message;
    console.log(`/api/protected/properties POST: ${msg}`);
    return response('serverError', null, msg);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();

    await updateProperty(id, data);
    revalidatePath('/newDashboard');
    return response('success', null, 'Talon päivitys onnistui!');
  } catch (err: any) {
    const msg = err.message;
    console.log(`/api/protected/properties PATCH: ${msg}`);
    return response('serverError', null, msg);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id: propertyId, password } = await req.json();
    const session = await loadSession();
    const owners = await db('data_propertyOwners').where({ propertyId, userId: session.user.id });

    if (!owners.length) {
      return response('forbidden', null, 'Vain talon omistajalla on oikeus poistaa se!');
    }

    const [encryptedPassword] = await db('data_users')
      .where({ id: session.user.id })
      .pluck('password');
    const ok = await bcrypt.compare(password, encryptedPassword);

    if (!ok) {
      return response('unauthorized', null, 'Käyttäjätilin salasana on väärä!');
    }

    await deleteObject(propertyId);
    revalidatePath('/newDashboard');
    return response('success', null, 'Talon poisto onnistui!');
  } catch (err: any) {
    const msg = err.message;
    console.log(`/api/protected/properties DELETE: ${msg}`);
    return response('serverError', null, msg);
  }
}
