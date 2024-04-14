import { NextRequest } from 'next/server';

export function verifyAuthorization(req: NextRequest) {
  if (!process.env.API_KEY) {
    throw new Error('Api key env variable not set!');
  }
  const key = req.headers.get('Authorization')?.split(' ')[1];
  return key === process.env.API_KEY;
}
