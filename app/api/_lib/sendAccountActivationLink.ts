import db from 'kotilogi-app/dbconfig';
import jwt from 'jsonwebtoken';
import { sendEmail } from './sendEmail';

/**Sends an activation link to the specified email address. */
export async function sendAccountActivationLink(email: string) {
  console.log(email);
  const [id] = await db('data_users').where({ email }).pluck('id');
  console.log(id);
  const activationToken = jwt.sign({ id }, process.env.ACTIVATION_SECRET);
  const activationLink = `${process.env.SERVICE_DOMAIN}/api/public/users/activate?token=${activationToken}`;
  await sendEmail('Tilin aktivointilinkki', 'Kotidok', email, activationLink);
}
