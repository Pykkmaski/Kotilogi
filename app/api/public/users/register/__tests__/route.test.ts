import db from '@/dbconfig';

jest.mock('@/dbconfig');

describe('Testing the register route.', () => {
  it('Test', async () => {
    db().where.mockReturnValue(222);
    console.log(db().where());
    //expect(await db().where()).toBe(222);
  });
});
