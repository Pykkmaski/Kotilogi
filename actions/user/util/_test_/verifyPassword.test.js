import {expect} from '@jest/globals';
import db from 'kotilogi-app/dbconfig';
const bcrypt = require('bcrypt');

import { verifyPassword } from '../verifyPassword';

const testUser = {
    email: 'test@email.com',
    password: '1234',
}

jest.mock('bcrypt');
jest.mock('@/dbconfig');

bcrypt.compare.mockImplementation((a, b) => a === b);

db.mockImplementation(() => ({
    select: jest.fn().mockResolvedValue([{password: '1234'}]),
    where: jest.fn().mockReturnThis(),
}));

test('Rejects an incorrect password.', async () => {
    const isOk = await verifyPassword(testUser.email, '4321');
    expect(isOk).toBeFalsy();
});

test('Accepts a correct password', async () => {
    const isOk = await verifyPassword(testUser.email, testUser.password);
    expect(isOk).toBeTruthy();
});