/**
 * @jest-environment node
 */
import { GET } from '../route';
import jwt from 'jsonwebtoken';
import { DatabaseTable } from '@/utils/databaseTable';
import { NextRequest, NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import db from 'kotilogi-app/dbconfig';

jest.mock('@/dbconfig.js');

const testUser = {
  email: 'test',
};

describe('Testing requests with valid token.', () => {
  var response: NextResponse = null;
  var redirectMock = jest.spyOn(NextResponse, 'redirect');
  redirectMock.mockReturnValue(
    new NextResponse(null, {
      status: 301,
    })
  );

  const validToken = jwt.sign(testUser, process.env.ACTIVATION_SECRET);

  describe('The user is unconfirmed.', () => {
    beforeAll(async () => {
      db().pluck.mockResolvedValueOnce(['unconfirmed']);

      const params = new URLSearchParams();
      params.set('token', validToken);

      response = await GET({
        nextUrl: new NextURL(`http://localhost:300?${params.toString()}`),
      } as NextRequest);
    });

    it('Responds with status-code 301.', () => {
      expect(response.status).toBe(301);
    });

    it('Calls the redirect-method with the correct arguments.', () => {
      expect(redirectMock).toHaveBeenCalledWith(process.env.SERVICE_DOMAIN + '/activated');
    });

    it("Updates the correct user's status to active.", () => {
      expect(db().update).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'active', activatedOn: expect.any(Number) })
      );
    });
  });

  describe('The user is already activated.', () => {
    beforeAll(async () => {
      //const dbSelectMock = jest.spyOn(db, 'select');
      db().pluck.mockResolvedValueOnce(['active']);

      const params = new URLSearchParams();
      params.set('token', validToken);

      const req = {
        nextUrl: new NextURL(`http://localhost:300?${params.toString()}`),
      } as NextRequest;

      response = await GET(req);
    });

    it('Responds with code 409.', () => {
      expect(response.status).toBe(409);
    });
  });

  describe('A user with the email in the token does not exist.', () => {
    beforeAll(async () => {
      //const dbSelectMock = jest.spyOn(db, 'select');
      db().select.mockResolvedValueOnce([]);
      const params = new URLSearchParams();
      params.set('token', validToken);

      const req = {
        nextUrl: new NextURL(`http://localhost:300?${params.toString()}`),
      } as NextRequest;

      response = await GET(req);
    });

    it('Responds with status code 500.', () => {
      expect(response.status).toBe(500);
    });
  });
});

describe('Testing requests with a correctly signed token, but it has been tampered with.', () => {
  const validToken = jwt.sign(testUser, process.env.ACTIVATION_SECRET);
  const tamperedToken = validToken.slice(0, validToken.length - 2);
  var response = null;

  beforeAll(async () => {
    const params = new URLSearchParams();
    params.set('token', tamperedToken);

    const req = {
      nextUrl: new NextURL(`http://localhost:300?${params.toString()}`),
    } as NextRequest;

    response = await GET(req);
  });

  it('Responds with code 409.', () => {
    expect(response.status).toBe(401);
  });
});

describe('Testing requests with invalid token.', () => {
  const invalidToken = jwt.sign(testUser, 'invalid_key');
  var response = null;

  beforeAll(async () => {
    const params = new URLSearchParams();
    params.set('token', invalidToken);

    const req = {
      nextUrl: new NextURL(`http://localhost:300?${params.toString()}`),
    } as NextRequest;

    response = await GET(req);
  });

  it('Responds with status 401.', () => {
    expect(response.status).toBe(401);
  });
});

describe('Testing requests with no token present.', () => {
  it('Responds with status 401.', async () => {
    const params = new URLSearchParams();

    const req = {
      nextUrl: new NextURL(`http://localhost:300?${params.toString()}`),
    } as NextRequest;

    const response = await GET(req);
    expect(response.status).toBe(401);
  });
});
