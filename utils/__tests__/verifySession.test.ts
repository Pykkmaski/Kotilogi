import { redirect } from 'next/navigation';
import { loadSession } from '../loadSession';
import { verifySession } from '../verifySession';

jest.mock('@/utils/loadSession', () => ({
  loadSession: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('Testing verifySession', () => {
  it('Redirects to the login page if a session is not present.', async () => {
    (loadSession as jest.Mock).mockResolvedValueOnce(undefined);
    const promise = verifySession();
    await expect(promise).resolves.not.toThrow();
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('Does not redirect when a session is present.', async () => {
    (loadSession as jest.Mock).mockResolvedValueOnce({
      user: {
        id: '1234',
      },
    });

    const promise = verifySession();
    await expect(promise).resolves.toEqual(
      expect.objectContaining({
        user: {
          id: '1234',
        },
      })
    );
  });
});
