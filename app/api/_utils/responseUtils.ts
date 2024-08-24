import { NextResponse } from 'next/server';

type ResponseType =
  | 'serverError'
  | 'success'
  | 'forbidden'
  | 'unauthorized'
  | 'conflict'
  | 'partial_success'
  | 'not_found';

const defaultMessages: Record<ResponseType, string> = {
  serverError: 'Palvelinvirhe.',
  success: '',
  forbidden: 'Estetty.',
  unauthorized: 'Kielletty.',
  conflict: 'Ristiriita.',
  partial_success: '',
  not_found: 'Ei löytynyt.',
};

const statusCode = {
  success: 200,
  forbidden: 403,
  unauthorized: 401,
  serverError: 500,
  conflict: 409,
  partial_success: 206,
  not_found: 404,
};

export const response = (type: ResponseType, body: BodyInit | null, statusText?: string) => {
  // Determine the response body
  const responseBody = body || defaultMessages[type];

  return new NextResponse(responseBody, {
    status: statusCode[type],
    statusText,
  });
};

export const handleServerError = (
  err: any,
  route: string,
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
) => {
  const msg = err.message;
  console.log(`${route} ${method}: ${msg}`);
  return response('serverError', msg, msg);
};
