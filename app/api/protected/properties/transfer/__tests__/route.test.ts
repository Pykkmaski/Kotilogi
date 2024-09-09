/**
 * @jest-environment node
 */
import { NextURL } from 'next/dist/server/web/next-url';
import { GET } from '../route';
import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';

const testPropertyId = '1234';
const testToken = 'test_token';
const testUserId = 'test_user_id';

jest.mock('@/dbconfig');
jest.mock('@/utils/loadSession');
jest.mock('bcrypt', () => ({
  compare: jest.fn((a, b) => a == b),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('test_token'),
}));

describe('Testing the property ownership transfer route.', () => {
  describe('Testing successful creation of transfer token.', () => {
    let req, res;
    beforeAll(async () => {
      db().select.mockResolvedValue([{ password: '1234' }]);
      db().pluck.mockResolvedValueOnce(['test_user_id']);
      (loadSession as jest.Mock).mockResolvedValueOnce({
        user: {
          id: 'test_user_id',
        },
      });
      req = new NextRequest(`http://localhost:3000?propertyId=${testPropertyId}`, {
        headers: {
          Authorization: 'Password 1234',
        },
      });

      res = await GET(req);
    });

    it('Responds with status 200', () => {
      expect(res.status).toBe(200);
    });

    it('Calls jwt.sign with the correct arguments.', () => {
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          propertyId: testPropertyId,
        }),
        process.env.TRANSFER_SECRET,
        expect.objectContaining({
          expiresIn: '24h',
        })
      );
    });

    it('Plucks the owner of the property by using the propertyId', () => {
      expect(db().where).toHaveBeenCalledWith({ propertyId: testPropertyId });
    });

    it('Returns a token.', async () => {
      const data = await res.json();
      expect(data).toEqual({
        token: 'test_token',
      });
    });
  });
});
