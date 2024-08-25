/**
 * @jest-environment node
 */

import db from 'kotilogi-app/dbconfig';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import jwt from 'jsonwebtoken';
import { sendEmail } from 'kotilogi-app/app/api/_lib/sendEmail';

jest.mock('@/dbconfig');
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));
jest.mock('@/app/api/_lib/sendEmail');

describe('Testing the GET route.', () => {
  const testEmail = 'test@email.com';
  it('Successfully sends a reset email.', async () => {
    const testId = 'test_id';
    const testToken = 'test_token';

    db().pluck.mockResolvedValue([testId]);
    (jwt.sign as jest.Mock).mockReturnValue(testToken);

    const req = new NextRequest(`http://localhost:3000?email=${testEmail}`, {
      method: 'POST',
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(db).toHaveBeenCalledWith('data_users');
    expect(db().where).toHaveBeenCalledWith({ email: testEmail });
    expect(db().pluck).toHaveBeenCalledWith('id');
    expect(jwt.sign).toHaveBeenCalledWith({ id: testId }, process.env.PASSWORD_RESET_SECRET, {
      expiresIn: 30 * 60,
    });
    expect(sendEmail).toHaveBeenCalledWith(
      'Sähköpostiosoitteen vaihto',
      'Kotidok',
      testEmail,
      `${process.env.SERVICE_DOMAIN}/login/reset?token=${testToken}`
    );
  });
});
