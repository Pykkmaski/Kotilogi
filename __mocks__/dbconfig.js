const where = jest.fn().mockReturnThis();
const select = jest.fn();
const update = jest.fn();
const insert = jest.fn();
const pluck = jest.fn();
const join = jest.fn().mockReturnThis();

const transaction = jest.fn().mockResolvedValue({
  where,
  select,
  update,
  insert,
  pluck,
  join,
  commit: jest.fn(),
  rollback: jest.fn(),
});

const db = jest.fn(tablename => ({
  where,
  select,
  update,
  insert,
  pluck,
  join,
}));

db.transaction = transaction;

module.exports = db;
