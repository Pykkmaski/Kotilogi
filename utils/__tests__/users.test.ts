import { users } from '@/utils/users';
import { sendAccountActivationLink } from '@/actions/email';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';

jest.mock('@/actions/email');
jest.mock('@/utils/databaseTable');
jest.mock('@/dbconfig');

describe('Testing successful user registration.', () => {
  it('Calls the SendEmailActivationFunction on successful registration.', async () => {
    await users.registerUser({
      email: 'testEmail',
      password: 'pass',
      plan: 'regular',
    });

    expect(sendAccountActivationLink).toHaveBeenCalledTimes(1);
    expect(sendAccountActivationLink).toHaveBeenCalledWith('testEmail');
  });
});

describe('Testing unsuccessful user registration.', () => {
  test('Resolves with user_exists, when trying to register with an email already in use, while using the dev db.', async () => {
    const mockedAdd = jest.spyOn(DatabaseTable.prototype, 'add');
    mockedAdd.mockRejectedValueOnce(new Error('unique'));

    const res = await users.registerUser({
      email: 'testEmail',
      password: 'pass',
      plan: 'regular',
    });

    expect(res).toBe('user_exists');
  });

  test('Resolves with user_exists, when trying to register with an email already in use, while using the prod db.', async () => {
    const mockedAdd = jest.spyOn(DatabaseTable.prototype, 'add');
    mockedAdd.mockRejectedValueOnce(new Error('duplicate'));

    const res = await users.registerUser({
      email: 'testEmail',
      password: 'pass',
      plan: 'regular',
    });

    expect(res).toBe('user_exists');
  });

  test('Resolves with unexpected, when some other error occurs.', async () => {
    const mockedAdd = jest.spyOn(DatabaseTable.prototype, 'add');
    mockedAdd.mockRejectedValueOnce(new Error('unexpected'));

    const res = await users.registerUser({
      email: 'testEmail',
      password: 'pass',
      plan: 'regular',
    });

    expect(res).toBe('unexpected');
  });
});
