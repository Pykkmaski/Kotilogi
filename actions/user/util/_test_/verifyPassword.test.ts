import {expect} from '@jest/globals';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import { verifyPassword } from '../verifyPassword';

const testUser = {
    email: 'test@email.com',
    password: '',
}

beforeEach(async () => {
    testUser.password = await bcrypt.hash('1234', 1);
    const user = await db('users').insert(testUser);
    expect(user).toBeDefined();
});

it('Verifies a correct password.', async () => {
    const correctPassword = '1234';
    const isOk = await verifyPassword(testUser.email, correctPassword);
    expect(isOk).toBeTruthy();
});

it('Rejects an incorrect password.', async () => {
    const incorrectPassword = '8989';
    const isOk = await verifyPassword(testUser.email, incorrectPassword);
    expect(isOk).toBeFalsy();
});

afterEach(async () => {
    await db('users').where({email: testUser.email}).del();
});