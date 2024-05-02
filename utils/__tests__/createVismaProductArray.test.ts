import { createVismaProductArray } from '../createVismaProductArray';

test('Returns an object with the correct properties.', () => {
  const price = 990;
  const bills = [];
  for (let i = 0; i < 5; ++i) {
    bills.push({
      id: i,
      amount: price,
      stamp: 'test',
    });
  }

  const products = createVismaProductArray(bills);
  products.forEach((product, index: number) => {
    expect(product).toEqual(
      expect.objectContaining({
        tax: 24,
        id: bills[index].id,
        price: Math.round(1.24 * price),
        pretax_price: price,
        count: 1,
        type: 1,
        title: bills[index].stamp,
      })
    );
  });
});
