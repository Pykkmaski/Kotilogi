import { users } from '@/utils/users';
import { sendAccountActivationLink } from '@/actions/email';
import { DatabaseTable } from 'kotilogi-app/utils/databaseTable';
import bcrypt from 'bcrypt';

jest.mock('@/actions/email');
jest.mock('@/utils/databaseTable');
jest.mock('@/dbconfig');
jest.mock('bcrypt');

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

describe('Testing password update.', () => {
  const testEmail = 'test@email.com';
  const testPassword = '123';

  it('Succesfully updates a password for an existing user.', async () => {
    (DatabaseTable.prototype.select as jest.Mock).mockResolvedValueOnce([
      {
        password: testPassword,
      },
    ]);
    const updateMock = jest.spyOn(DatabaseTable.prototype, 'update');

    (bcrypt.hash as jest.Mock).mockResolvedValueOnce(testPassword);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    await users.updatePassword('test@email.com', testPassword, testPassword).then(result => {
      expect(result).toBe('success');
      expect(DatabaseTable.prototype.select).toHaveBeenCalledWith('password', { email: testEmail });
      expect(bcrypt.compare).toHaveBeenCalledWith(testPassword, testPassword);

      //Hashes the new password
      expect(bcrypt.hash).toHaveBeenCalledWith(testPassword, 15);

      expect(updateMock).toHaveBeenCalledWith({ password: testPassword }, { email: testEmail });
    });
  });

  it('Fails with invalid_password when the old password does not match with the encrypted password.', async () => {
    (DatabaseTable.prototype.select as jest.Mock).mockResolvedValueOnce([
      {
        password: 'different',
      },
    ]);

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    users.updatePassword(testEmail, testPassword, testPassword).then(result => {
      expect(result).toBe('invalid_password');
    });
  });

  it('Fails with unexpected, when some other error occurs.', async () => {
    (DatabaseTable.prototype.select as jest.Mock).mockResolvedValueOnce([]);
    await users.updatePassword(testEmail, testPassword, testPassword).then(result => {
      expect(result).toBe('unexpected');
    });
  });
});

describe('Testing email update', () => {
  it('The DatabaseTable update-method gets called with the correct arguments.', async () => {
    const updateMock = jest.spyOn(DatabaseTable.prototype, 'update');
    await users.updateEmail('old_email', 'new_email');
    expect(updateMock).toHaveBeenCalledWith({ email: 'new_email' }, { email: 'old_email' });
  });
});
