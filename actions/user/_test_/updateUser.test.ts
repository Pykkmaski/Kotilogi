import {expect, jest} from '@jest/globals';
import { updateEmail, updatePassword } from '../updateUser';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';

jest.setTimeout(10000);

const testUser = {
    email: 'test@user.email',
    password: '',
}

beforeEach(async () => {
    testUser.password = await bcrypt.hash('1234', 1);
    const user = await db('users').insert(testUser, '*');
    expect(user).toBeDefined();
});


describe('Updating a users password.', () => {
    it('Correctly updates a password.', async () => {
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
});

describe('Updating a users email.', () => {
    it('Correctly updates the email of a user.', async () => {
        const newEmail = 'test2@email.com';
        await updateEmail(testUser.email, newEmail);
        expect(await db('users').where({email: newEmail}).first()).toBeDefined();
        
        //Delete the test user by its new email.
        await db('users').where({email: newEmail}).del();
    });
})

afterEach(async () => {
    await db('users').where({email: testUser.email}).del();
});