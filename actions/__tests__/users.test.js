import * as database from '../database';
import * as users from '../users';
import {MaxProperties} from '../../constants';

jest.mock('../database');

describe('Testing the users-module', () => {
    describe('Testing the getMaxProperties-method', () => {
        it('Returns the correct number for regular users', async () => {
            database.get.mockResolvedValueOnce([{plan: 'regular'}]);
            const result = await users.getMaxProperties('testUser');
            expect(result).toBe(MaxProperties.REGULAR);
        });

        it('Returns the correct number for pro users', async () => {
            database.get.mockResolvedValueOnce([{plan: 'pro'}]);
            const result = await users.getMaxProperties('testUser');
            expect(result).toBe(MaxProperties.PRO);
        });

        it('Throws the invalid_user-error if a user is not found', async () => {
            database.get.mockResolvedValueOnce([]);
            await expect(users.getMaxProperties('')).rejects.toThrow('invalid_user');
        });
    });
})