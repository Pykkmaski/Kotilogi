/**
 * @jest-environment node
 */
import db from '@/dbconfig';
import { NextRequest, NextResponse } from 'next/server';
import { POST } from '../route';
import { sendAccountActivationLink } from '@/app/api/_lib/sendAccountActivationLink';
import bcrypt from 'bcrypt';

jest.mock('@/dbconfig');
jest.mock('@/app/api/_lib/sendAccountActivationLink');
jest.mock('bcrypt', () => ({
  hash: jest.fn(pass => 'hashed_pass'),
}));

describe('Testing the register route.', () => {
  const testEmail = 'test@email.com';
  const testPassword = '1234';

  describe('Testing requests with valid data.', () => {
    let res: NextResponse;

    beforeAll(async () => {
      const req = new NextRequest('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
        }),
      });
      res = await POST(req);
    }, 10000);

    it('Returns status 200.', () => {
      expect(res.status).toBe(200);
    });

    it('Sends an activation email to the user.', () => {
      expect(sendAccountActivationLink).toHaveBeenCalledWith(testEmail);
    });

    it('Hashes the password with bcrypt.', () => {
      expect(bcrypt.hash).toHaveBeenCalledWith('1234', 15);
    });

    it('Inserts the users data into the db, and sets the new users status to 0 (unconfirmed)', () => {
      expect(db().insert).toHaveBeenCalledWith(
        expect.objectContaining({
          email: testEmail,
          password: 'hashed_pass',
          status: 0,
        })
      );
    });
  });

  describe('Testing requests with invalid fields in the data.', () => {
    let res: NextResponse;

    beforeAll(async () => {
      const req = new NextRequest('http://localhost:300', {
        method: 'POST',
        body: JSON.stringify({
          email: testEmail,
        }),
      });

      res = await POST(req);
    }, 10000);

    it('Responds with status 500.', () => {
      expect(res.status).toBe(500);
    });
  });
});
