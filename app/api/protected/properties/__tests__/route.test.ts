/**
 * @jest-environment node
 */
import { NextRequest, NextResponse } from 'next/server';
import { DELETE } from '../route';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { NextURL } from 'next/dist/server/web/next-url';

let testUser;
beforeAll(() => {
  testUser = {
    id: 'user_id',
  };

  jest.mock('@/utils/loadSession', () => ({
    default: jest.fn().mockResolvedValue({
      user: testUser,
    }),
  }));
});

jest.mock('@/dbconfig');
jest.mock('bcrypt');

describe('Testing the protected properties-route.', () => {
  describe('Testing the DELETE route.', () => {
    const testPass = 'test_password';
    const propertyId = 'property_id';

    describe('Testing successful deletion.', () => {
      let res: NextResponse;
      const encryptedPass = 'encrypted_pass';

      beforeAll(async () => {
        db().where.mockResolvedValueOnce([1]);
        db().pluck.mockResolvedValueOnce([encryptedPass]);

        (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
        const url = new NextURL(`http://localhost:3000?id=${propertyId}`);

        const req = {
          nextUrl: url,
          headers: {
            get: jest.fn().mockReturnValue(`Password ${testPass}`),
          },
        };

        res = await DELETE(req as any);
      });

      it('Responds with status 200.', async () => {
        expect(res.status).toBe(200);
      });
    });
  });
});
