import db from '../../dbconfig';
import { add } from '../properties';
import { upload } from '../file';

const testUser = {
  email: 'test@user.com',
  password: '1234',
  plan: 'regular',
  status: 'active',
};

beforeAll(async () => {
  jest.mock('../file', {
    upload: jest.fn().mockResolvedValue([[], null]),
  });

  //Add a test user
  await db('users').insert(testUser);
});

describe('Testing adding of properties', () => {
  const testProperty = {
    refId: testUser.email,
    title: 'testAddress',
  };

  describe('When a cart does not exist', () => {
    it('Adds a cart expiring a month forward and a cart item, with the correct price.', async () => {
      console.log(await upload([]));

      add(testProperty).then(async () => {
        const [cart, cartItem] = await db('carts')
          .where({ customer: testUser.email })
          .then(async cart => {
            const [cartItem] = await db('cartItems').where({ cartId: cart.id });
            return [cart, cartItem];
          });

        expect(cart).toBeDefined();
        expect(cartItem).toBeDefined();

        const expectedDueDate = new Date();
        expectedDueDate.setMonth(expectedDueDate.getMonth() + 1);

        expect(cart.due).toBe(expectedDueDate.getTime());
        expect(cartItem.amount).toBe(990);
      });
    });
  });

  afterAll(async () => {
    await db('properties').where(testProperty).del();
  });
});

afterAll(async () => {
  await db('users').where({ email: testUser.email }).del();
  jest.unmock('../file');
});
