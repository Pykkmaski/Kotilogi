'use server';
import db from 'kotilogi-app/dbconfig';
import jwt from 'jsonwebtoken';
import { createHash, Hmac } from 'crypto';

export async function generateTokenAction(propertyId: string) {
  //Verify the property exists.
  const [property] = await db('property.overview').where({ id: propertyId });
  if (!property) {
    return null;
  }

  const code = createHash('SHA256', {
    outputLength: 32,
  })
    .update(Date.now() + propertyId)
    .digest('hex');

  const expires = new Date();
  expires.setDate(expires.getDate() + 1);

  await db('property.transferCodes')
    .insert({
      expires,
      code,
      propertyId,
    })
    .onConflict('propertyId')
    .merge();

  return `${process.env.SERVICE_DOMAIN}/api/protected/properties/transfer?token=${code}`;
}
