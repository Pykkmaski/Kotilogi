import { NextRequest, NextResponse } from 'next/server';

type ResponseType =
  | 'serverError'
  | 'success'
  | 'forbidden'
  | 'unauthorized'
  | 'conflict'
  | 'partial_success'
  | 'not_found'
  | 'bad_request';

const defaultMessages: Record<ResponseType, string> = {
  serverError: 'Palvelinvirhe.',
  success: '',
  forbidden: 'Estetty.',
  unauthorized: 'Kielletty.',
  conflict: 'Ristiriita.',
  partial_success: '',
  not_found: 'Ei löytynyt.',
  bad_request: 'Virheellinen pyyntö.',
};

const statusCode = {
  success: 200,
  forbidden: 403,
  unauthorized: 401,
  serverError: 500,
  conflict: 409,
  partial_success: 206,
  not_found: 404,
  bad_request: 400,
};

export const response = (
  type: ResponseType,
  body: BodyInit | null,
  statusText?: string,
  options?: { revalidate: boolean }
) => {
  // Determine the response body
  const responseBody = body || defaultMessages[type];

  return new NextResponse(responseBody, {
    status: statusCode[type],
    statusText: statusText && statusText.normalize('NFC'),
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};

export const handleServerError = (req: NextRequest, err: any) => {
  const msg = err.message;
  console.log(`${req.nextUrl.pathname} ${req.method}: ${msg}`);
  return response('serverError', msg, 'Palvelinvirhe.');
};

export const createResponseMessage = (message: string) => {
  return JSON.stringify({
    message,
  });
};
