const where = jest.fn().mockReturnThis();
const select = jest.fn().mockReturnThis();
const update = jest.fn();
const insert = jest.fn();
const pluck = jest.fn();

module.exports = jest.fn(tablename => ({
  where,
  select,
  update,
  insert,
  pluck,
}));
