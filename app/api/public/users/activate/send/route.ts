import { sendAccountActivationLink } from 'kotilogi-app/app/api/_lib/sendAccountActivationLink';
import { handleServerError, response } from 'kotilogi-app/app/api/_utils/responseUtils';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await loadSession();
    if (!session) {
      return redirect('/login');
    }

    await sendAccountActivationLink(session.user.email);
    return response('success', 'Vahvistuslinkki lähetetty! Tarkista sähköpostisi.');
  } catch (err) {
    return handleServerError(req, err);
  }
}
