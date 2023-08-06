const CreateLoginPayload = require('../Functions/Util/CreateLoginPayload');
const VerifyPassword = require('../Functions/Util/VerifyPassword');
const {getUserByEmail} = require('../models/database');
const CreateToken = require('../Functions/Util/CreateToken');

jest.mock('../Functions/Util/VerifyPassword');
jest.mock('../Functions/Util/CreateToken');
jest.mock('../models/database');

describe('Testing the CreateLoginPayload function', () => {

   it('Rejects with code 404 when trying to log in as a non existent user', async () => {
      getUserByEmail.mockImplementationOnce(() => Promise.resolve(undefined));
      await expect(CreateLoginPayload('Test', 'pass')).rejects.toThrow('404');
   });

   it('Rejects with code 401 if password doesn\'t match the encrypted password', async () => {
      getUserByEmail.mockImplementationOnce(() => Promise.resolve(true));
      VerifyPassword.mockImplementationOnce(() => false);
      await expect(CreateLoginPayload('Test', 'pass')).rejects.toThrow('401');
   });

   it('Resolves when the user exists and the password is correct', async () => {
      getUserByEmail.mockImplementationOnce(() => Promise.resolve({active: true}));
      VerifyPassword.mockImplementationOnce(() => true);
      CreateToken.mockImplementationOnce(() => 'token');

      const result = JSON.parse(await CreateLoginPayload('test', 'pass'));

      expect(result.token).toBe('Bearer token');
      expect(result.email).toBe('test');
      expect(result.active).toBe(true);
   });
});