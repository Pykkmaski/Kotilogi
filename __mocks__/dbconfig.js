const where = jest.fn().mockReturnThis();
const select = jest.fn().mockReturnThis();
const update = jest.fn();
const insert = jest.fn();
const pluck = jest.fn();

const transaction = jest.fn().mockResolvedValue({
  where,
  select,
  update,
  insert,
  pluck,
  commit: jest.fn(),
  rollback: jest.fn(),
});

const db = jest.fn(tablename => ({
  where,
  select,
  update,
  insert,
  pluck,
}));

db.transaction = transaction;

module.exports = db;
