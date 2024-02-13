import {properties} from '../properties';
import { users } from '../users';

jest.mock('../properties');
jest.mock('../users');

describe('Testing the properties object', () => {
    describe('Testing the property verification function', () => {
        it('Succeedes on regular users with no properties added', async () => {
            users.get.mockResolvedValueOnce([{email: 'testUser', plan: 'regular'}]);
            properties.getPropertyCountByUser.mockResolvedValueOnce({count: 0});

            const result = properties.validateAdd({
                email: 'testUser',
            });

            await expect(result).resolves.toBe(true);
        });
    });
});