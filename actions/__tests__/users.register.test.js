const db = require('../../dbconfig');
import {register} from '../users';
import { sendAccountActivationLink } from '../email';

const testUser = {
    email: 'test@user.com',
    password: '1234',
    plan: 'regular',
}

beforeAll(() => {
    //Mock out the function that sends activation links.
    jest.mock('../email', () => ({
        sendAccountActivationEmail: jest.fn(),
    }));
});

describe('Testing new user registration', () => {
    it('Successfully registers and adds a user to the database with the correct attributes.', async () => {
        register(testUser).then(async result => {
            expect(result).toBe('success');
            const [newUser] = await db('users').where({email: testUser.email});
            expect(newUser).toBeDefined();
            expect(newUser.plan).toBe('unconfirmed');
            expect(sendAccountActivationLink).toHaveBeenCalledTimes(1);
        })
        .finally(async () => {
            
        });
    });

    afterEach(async () => {
        //Clean up the test user.
        await db('users').where({email: testUser.email}).del();
    })
});

describe('Testing registration when a user with an email already exists', () => {
    beforeAll(async () => {
        //Add a test user
        await db('users').insert(testUser);
    });

    it('Resolves with \'user_exists\'.', async () => {
        register(testUser)
        .then(result => {
            expect(result).toBe('user_exists');
        });
    });

    afterAll(async () => {
        await db('users').where({email: testUser.email}).del();
    });
})

afterAll(() => {
    jest.unmock('../email');
});