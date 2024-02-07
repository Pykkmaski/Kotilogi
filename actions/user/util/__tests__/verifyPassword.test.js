import db from '@/dbconfig';
import bcrypt from 'bcrypt';
import {verifyPassword} from '../verifyPassword';

jest.mock('../../../../dbconfig');
jest.mock('bcrypt');

describe('Testing password verification function', () => {
    it('Resolves to true if the password is correct', async () => {
        db.select.mockResolvedValueOnce([{password: '1234'}]);
        bcrypt.compare.mockResolvedValueOnce(true);
        await expect(verifyPassword('test', '1234')).resolves.toBe(true);
    });
});