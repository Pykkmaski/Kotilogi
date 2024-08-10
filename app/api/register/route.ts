import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
require('dotenv').config();

async function getUser(email: string) {
  return await db('users').where({ email }).first();
}

export async function POST(request) {
  try {
    const data: { password: string; email: string } = await request.json();
    const { password } = data;

    data.password = await bcrypt.hash(password, process.env.PASSWORD_HASH_ROUNDS || 15);

    await db('data_users').insert({
      ...data,
    });

    return new Response(null, { status: 201 });
  } catch (err) {
    const msg = err.message;
    console.log(msg);

    if (msg.includes('UNIQUE'))
      return new NextResponse('duplicate_user', {
        status: 406,
        statusText: 'Register failed! User already exists!',
      });

    return new Response(err.message, { status: 500 });
  }
}
