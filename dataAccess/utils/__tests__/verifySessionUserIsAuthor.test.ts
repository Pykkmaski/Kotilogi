import db from 'kotilogi-app/dbconfig';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import { verifySessionUserIsAuthor } from '../verifySessionUserIsAuthor';
import { redirect } from 'next/navigation';

const testUserId = 'test_user_id';

jest.mock('@/dbconfig');
jest.mock('next/navigation', () => ({
  redirect: jest.fn().mockImplementationOnce(() => {
    throw new Error();
  }),
}));

jest.mock('@/utils/loadSession', () => ({
  loadSession: jest.fn(),
}));

describe('Testing verifySessionUserIsAuthor', () => {
  it('Redirects to the login-page if not logged in.', async () => {
    (loadSession as jest.Mock).mockResolvedValueOnce(undefined);

    const promise = verifySessionUserIsAuthor('1');
    await expect(promise).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('Throws an error when the logged in user is not the author of an object.', async () => {
    (loadSession as jest.Mock).mockResolvedValueOnce({
      user: {
        id: testUserId,
      },
    });

    db().pluck.mockResolvedValueOnce(['1234']);
    const promise = verifySessionUserIsAuthor('1');
    await expect(promise).rejects.toThrow();
  });
});
