import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';

export async function GET(req: NextRequest) {
  try {
    const token = new URL(req.url).searchParams.get('token');
    if (!token) {
      throw new Error('token_not_found');
    }

    jwt.verify(
      token,
      process.env.PASSWORD_RESET_SECRET,
      async (err, decoded: { email: string; password: string }) => {
        if (err) {
          throw new Error('invalid_token');
        }

        await db('data_users')
          .where({ email: decoded.email })
          .update({
            password: await bcrypt.hash(decoded.password, 15),
          });
      }
    );
  } catch (err) {
    const msg = err.message;
    console.log(msg);
    return new NextResponse(null, {
      status: 500,
    });
  }
}
