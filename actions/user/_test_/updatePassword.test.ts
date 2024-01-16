
import db from 'kotilogi-app/dbconfig';
import { updatePassword } from '../updatePassword';
import {verifyPassword} from '../util/verifyPassword';
import bcrypt from 'bcrypt';
import {expect, jest, test} from '@jest/globals';

const testUser = {
    email: 'test.user@email.com',
    password: '1234',
}

jest.mock('../util/verifyPassword');

it('Correctly updates a password.', async () => {
    jest.fn(verifyPassword).mockResolvedValueOnce(true);
    const newPassword = '5678';
    await updatePassword(testUser.email, newPassword, '1234');
    const {password} = await db('users').where({email: testUser.email}).first().select('password');

    expect(await bcrypt.compare(newPassword, password)).toBeTruthy();
});

it('Fails when trying to update with incorrect current password.', async () => {
    const incorrectPassword = '47474';
    const newPassword = '6363';
    await expect(updatePassword(testUser.email, newPassword, incorrectPassword)).rejects.toStrictEqual(Error('invalid_password'));
});