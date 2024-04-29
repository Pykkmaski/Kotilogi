import { users } from '@/utils/users';
import { sendAccountActivationLink } from '@/actions/email';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';

jest.mock('@/actions/email');
jest.mock('@/utils/databaseTable');
jest.mock('@/dbconfig');

const testUser = {
  email: 'testEmail',
  password: 'pass',
  plan: 'regular',
};

describe('Testing successful user registration.', () => {
  var registerResult = null;
  beforeAll(async () => {
    registerResult = await users.registerUser(testUser);
  });

  it('Resolves with a success-result.', async () => {
    expect(registerResult).toBe('success');
  });

  it('Calls the SendEmailActivationFunction.', async () => {
    expect(sendAccountActivationLink).toHaveBeenCalledTimes(1);
    expect(sendAccountActivationLink).toHaveBeenCalledWith(testUser.email);
  });
});

describe('Testing unsuccessful user registration.', () => {
  test('Resolves with user_exists, when trying to register with an email already in use, while using the dev db.', async () => {
    (DatabaseTable.prototype.add as jest.Mock).mockRejectedValueOnce(new Error('unique'));
    const res = await users.registerUser(testUser);
    expect(res).toBe('user_exists');
  });

  test('Resolves with user_exists, when trying to register with an email already in use, while using the prod db.', async () => {
    (DatabaseTable.prototype.add as jest.Mock).mockRejectedValueOnce(new Error('duplicate'));
    const res = await users.registerUser(testUser);
    expect(res).toBe('user_exists');
  });

  test('Resolves with unexpected, when some other error occurs.', async () => {
    (DatabaseTable.prototype.add as jest.Mock).mockRejectedValueOnce(new Error('unexpected'));
    const res = await users.registerUser(testUser);
    expect(res).toBe('unexpected');
  });
});
