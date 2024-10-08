import db from 'kotilogi-app/dbconfig';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import { response } from '../../_utils/responseUtils';
import { loadSession } from 'kotilogi-app/utils/loadSession';

export async function GET(req: NextRequest) {
  return new NextResponse('Not implemented.', { status: 500 });
}
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      id: z.string(),
    }).parse(data);

    const { id, ...updateData } = data;
    const session = await loadSession();
    if (id !== session.user.id) {
      return response('forbidden', null, 'Tiliä voi muokata ainoastaan sen omistaja!');
    }

    await db('data_users').where({ id }).update(updateData);
    return response('success', null, 'Käyttäjän päivitys onnistui!');
  } catch (err) {
    console.log(`/api/protected/users PATCH: ${err.message}`);
    return response('serverError', null, err.message);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      id: z.string(),
      redirectUrl: z.string().optional(),
    }).parse(data);

    const session = await loadSession();
    if (data.id !== session.user.id) {
      return response('forbidden', null, 'Vain käyttäjä itse voi poistaa tilinsä!');
    }

    await db('data_users').where({ id: data.id }).del();
    return response('success', null, 'Käyttäjä poistettu!');
  } catch (err) {
    const msg = err.message;
    console.log(`/api/protected/users DELETE: ${msg}`);
    return response('serverError', null, msg);
  }
}
