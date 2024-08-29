import db from 'kotilogi-app/dbconfig';
import jwt from 'jsonwebtoken';
import { sendAccountActivationLink } from '../sendAccountActivationLink';
import { sendEmail } from '../sendEmail';

jest.mock('@/dbconfig');
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('jwt_token'),
}));
jest.mock('../sendEmail');

describe('Testing the sendAccountActivationLink-method.', () => {
  const testUserId = 'user_id';
  const testEmail = 'test_email';

  beforeAll(async () => {
    db().pluck.mockResolvedValue([testUserId]);

    await sendAccountActivationLink(testEmail);
  });

  it('Calls db.where with the correct arguments.', () => {
    expect(db().where).toHaveBeenCalledWith({ email: testEmail });
  });

  it('Calls jwt.sign with the correct arguments', () => {
    expect(jwt.sign).toHaveBeenCalledWith({ id: testUserId }, process.env.ACTIVATION_SECRET);
  });

  it('Sends the correct link to the email address.', () => {
    const activationLink = `${process.env.SERVICE_DOMAIN}/api/public/users/activate?token=jwt_token`;
    expect(sendEmail).toHaveBeenCalledWith(
      'Tilin aktivointilinkki',
      'Kotidok',
      testEmail,
      activationLink
    );
  });
});
