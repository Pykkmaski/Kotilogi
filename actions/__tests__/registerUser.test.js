import {registerUser} from '../registerUser';
import db from '@/dbconfig';
const bcrypt = require('bcrypt');

jest.mock('../../dbconfig');
jest.mock('bcrypt');

describe('Testing the user registration function', () => {
    it('Registers a new user', async () => {
        const credentials = {
            email: 'testUser@email.com',
            password: '1234',
            plan: 'regular',
        }

        db.insert.mockResolvedValueOnce(Promise.resolve());
        bcrypt.hash.mockImplementationOnce((pass) => Promise.resolve(pass));

        await expect(registerUser(credentials)).resolves.toBe('success');
    });

    it('Rejects if trying to register a user with the email of an existing user', async () => {
        const credentials = {
            email: 'testUser@email.com',
            password: '1234',
            plan: 'regular',
        }

        db.insert.mockRejectedValueOnce(new Error('UNIQUE'));
        bcrypt.hash.mockImplementationOnce((pass) => Promise.resolve(pass));

        await expect(registerUser(credentials)).rejects.toBe('user_exists');
    });
});