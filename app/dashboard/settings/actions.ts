'use server';

import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { users } from 'kotilogi-app/dataAccess/users';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import db from 'kotilogi-app/dbconfig';
import { sendHTMLEmail } from 'kotilogi-app/app/api/_lib/sendHTMLEmail';

export const deleteUserAction = async (password: string) => {
  z.string().parse(password);
  const session = await verifySession();

  await users.del(session.user.id, password);
  return redirect('/logout');
};

export const updatePasswordAction = async (newData: { password?: string }) => {
  z.object({
    email: z.string().email().optional(),
    password: z.string().optional(),
  });

  await users.update(newData);
  revalidatePath('/dashboard');
};

export const updateEmailAction = async (newEmail: string) => {
  z.string().parse(newEmail);
  const session = await verifySession();
  if (session.user.email === newEmail) {
    return {
      status: 400,
      statusText: 'Uusi sähköpostiosoite ei voi olla sama kuin nykyinen osoitteesi!',
    };
  }

  //Verify there is not another account using the new email.
  const [acc] = await db('data_users').where({ email: newEmail });
  if (acc) {
    return {
      status: 409,
      statusText: `Sähköpostiosoite on jo käytössä toisella käyttäjällä!`,
    };
  }

  const token = jwt.sign({ email: newEmail, userId: session.user.id }, process.env.TOKEN_SECRET, {
    expiresIn: '24h',
  });

  await sendHTMLEmail(
    'Kotidok - Uuden sähköpostiosoitteen vahvistus',
    'Kotidok',
    newEmail,
    `
      <h1>Sähköpostiosoitteen vaihto</h1>
      <p>
        Hei!<br/> <br/>
        Olet pyytänyt sähköpostiosoitteesi vaihtoa Kotidokissa.<br/>
        Ole hyvä ja vahvista osoite <a href="${process.env.SERVICE_DOMAIN}/api/public/users/reset_email?token=${token}">klikkaamalla tähän.</a><br/>
        Jos et pyytänyt sähköpostiosoitteesi vaihtoa, voit jättää tämän viestin huomioimatta.<br/><br/>

        Yt. Kotidok tiimi.
      </p>
    `
  );

  return {
    status: 200,
    statusText: 'Sähköpostiosoitteen vaihdon linkki lähetetty!',
  };
};
