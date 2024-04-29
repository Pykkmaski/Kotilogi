/**
 * @jest-environment node
 */
import { GET } from '../route';
import jwt from 'jsonwebtoken';
import { DatabaseTable } from '@/utils/databaseTable';
import { NextResponse } from 'next/server';

jest.mock('@/dbconfig');

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

  var dbUpdateMock = jest.spyOn(DatabaseTable.prototype, 'update');

  const validToken = jwt.sign(testUser, process.env.ACTIVATION_SECRET);

  beforeAll(async () => {
    const dbSelectMock = jest.spyOn(DatabaseTable.prototype, 'select');
    dbSelectMock.mockResolvedValueOnce([{ status: 'unconfirmed' }]);
    response = await GET({} as any, { params: { token: validToken } } as any);
  });

  it('Responds with status-code 301.', () => {
    expect(response.status).toBe(301);
  });

  it('Calls the redirect-method with the correct arguments.', () => {
    expect(redirectMock).toHaveBeenCalledWith(process.env.SERVICE_DOMAIN + '/activated');
  });

  it('Updates the correct users status to active.', () => {
    expect(dbUpdateMock).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'active', activatedOn: expect.any(Number) }),
      expect.objectContaining({ email: testUser.email })
    );
  });
});

describe('Testing requests with invalid token.', () => {
  const invalidToken = jwt.sign(testUser, 'invalid_key');
  var response = null;

  beforeAll(async () => {
    response = await GET({} as any, { params: { token: invalidToken } });
  });

  it('Responds with status 403.', () => {
    expect(response.status).toBe(403);
  });
});

describe('Testing requests with no token present.', () => {
  it('Responds with status 400.', async () => {
    const response = await GET({} as any, { params: { token: null } } as any);
    expect(response.status).toBe(400);
  });
});
