import db from 'kotilogi-app/dbconfig';
import { deleteObject } from 'kotilogi-app/dataAccess/objects';
import { createProperty, getProperty, updateProperty } from 'kotilogi-app/models/propertyData';
import { PropertyDataType } from 'kotilogi-app/dataAccess/types';
import { loadSession } from 'kotilogi-app/utils/loadSession';

import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { searchParamsToObject } from 'kotilogi-app/utils/searchParamsToObject';
import z from 'zod';
import { handleServerError, response } from '../../_utils/responseUtils';
import { revalidatePath } from '../../_utils/revalidatePath';

export async function GET(req: NextRequest) {
  try {
    const { q, ...query } = searchParamsToObject(new URL(req.url).searchParams);

    const property = await getProperty(query.id);
    return response('success', JSON.stringify(property));
  } catch (err) {
    return handleServerError(req, err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    z.object({
      propertyTypeId: z.string(),
      streetAddress: z.string(),
      zipCode: z.string(),
      buildingTypeId: z.string(),
    }).parse(data);

    await createProperty(data);
    await revalidatePath('/dashboard/properties');
    return response('success', null, 'Talon lisäys onnistui!', { revalidate: true });
  } catch (err: any) {
    return handleServerError(req, err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();

    await updateProperty(id, data);
    await revalidatePath('/dashboard/properties');
    return response('success', null, 'Talon päivitys onnistui!', { revalidate: true });
  } catch (err: any) {
    return handleServerError(req, err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authorization = req.headers.get('Authorization');
    if (!authorization) {
      throw new Error('Authorization header missing!');
    }

    const propertyId = req.nextUrl.searchParams.get('id');

    const session = await loadSession();
    const owners = await db('data_propertyOwners').where({ propertyId, userId: session.user.id });

    if (!owners.length) {
      return response('forbidden', null, 'Vain talon omistajalla on oikeus poistaa se!');
    }

    const [encryptedPassword] = await db('data_users')
      .where({ id: session.user.id })
      .pluck('password');

    const password = authorization.split(' ')[1];
    const ok = await bcrypt.compare(password, encryptedPassword);

    if (!ok) {
      return response('unauthorized', null, 'Käyttäjätilin salasana on väärä!');
    }

    await deleteObject(propertyId);
    await revalidatePath('/dashboard/properties');
    return response('success', null, 'Talon poisto onnistui!');
  } catch (err: any) {
    return handleServerError(req, err);
  }
}
