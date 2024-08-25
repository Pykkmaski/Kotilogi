import { NextRequest } from 'next/server';
import z from 'zod';
import { sendContactMessage } from '../../_lib/sendContactMessage';
import { handleServerError, response } from '../../_utils/responseUtils';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      message: z.string(),
      email: z.string().email(),
    }).parse(data);

    await sendContactMessage(data);
    return response('success', null, 'Viesti lähetetty onnistuneesti!');
  } catch (err) {
    return handleServerError(req, err);
  }
}
