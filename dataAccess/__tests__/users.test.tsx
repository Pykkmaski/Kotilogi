import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { createUser, deleteUser, updateUser, verifyPassword } from '../users';
import { hashPassword } from '../utils/hashPassword';
import { loadSession } from 'kotilogi-app/utils/loadSession';
import * as verify from 'kotilogi-app/utils/verifySession';
import { redirect } from 'next/navigation';

jest.mock('@/dbconfig');
jest.mock('bcrypt', () => ({
  compare: jest.fn((a, b) => a === b),
}));

jest.mock('@/dataAccess/utils/hashPassword', () => ({
  hashPassword: jest.fn(),
}));
jest.mock('@/utils/loadSession', () => ({
  loadSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

const testPassword = '1234';
const testUserId = 'user_id';
const testUserEmail = 'test_email';

describe('Testing the verify password function.', () => {
  it('Returns true when the password is correct.', async () => {
    db().select.mockResolvedValueOnce([{ password: testPassword }]);
    const promise = verifyPassword(testUserId, testPassword);
    await expect(promise).resolves.not.toThrow();

    expect(db().where).toHaveBeenCalledWith({ id: testUserId });
    expect(db().select).toHaveBeenCalledWith('password');
    expect(bcrypt.compare).toHaveBeenCalledWith(testPassword, testPassword);
  });

  it('Throws an error if the password is incorrect.', async () => {
    db().select.mockResolvedValueOnce([{ password: 'incorrect' }]);
    const promise = verifyPassword(testUserId, testPassword);
    await expect(promise).rejects.toThrow(/Salasana on virheellinen/);
  });

  it('Throws an error if the user does not have a password saved.', async () => {
    db().select.mockResolvedValueOnce([]);
    const promise = verifyPassword(testUserId, testPassword);
    await expect(promise).rejects.toThrow(/missing from the db/);
  });
});

describe('Testing createUser', () => {
  it('Inserts a new user object with the correct fields.', async () => {
    const hashedPassword = 'hashed_password';
    (hashPassword as jest.Mock).mockResolvedValueOnce(hashedPassword);
    const promise = createUser({ email: testUserEmail, password: testPassword });
    await expect(promise).resolves.not.toThrow();
    expect(db().insert).toHaveBeenCalledWith(
      expect.objectContaining({
        email: testUserEmail,
        password: hashedPassword,
        status: 0,
      })
    );
  });
});

describe('Testing updateUser', () => {
  it('Redirects to the login page if there is no session.', async () => {
    (loadSession as jest.Mock).mockResolvedValueOnce(undefined);
    (redirect as unknown as jest.Mock).mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = updateUser({ email: testUserEmail });
    await expect(promise).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith('/login');
  });
});

describe('Testing deleteUser', () => {
  it('Throws an error if trying to delete a user without a status', async () => {
    db().select.mockResolvedValueOnce([]);
    const promise = deleteUser('id');
    await expect(promise).rejects.toThrow(/does not exist/);
  });

  it('Throws an error if the user is not unconfirmed.', async () => {
    db().select.mockResolvedValueOnce([{ status: 1 }]);
    const promise = deleteUser('id');
    await expect(promise).rejects.toThrow(/user is active/);
  });

  it('Throws an error if the active user themselves is not then one doing the deletion.', async () => {
    db().select.mockResolvedValueOnce([{ status: 0 }]);
    (loadSession as jest.Mock).mockResolvedValueOnce({
      user: {
        id: testUserId,
      },
    });

    const promise = deleteUser('id');
    await expect(promise).rejects.toThrow(/Only the user themselves can delete/);
  });
});
