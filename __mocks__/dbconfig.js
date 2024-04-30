const where = jest.fn().mockReturnThis();
const select = where;
const insert = jest.fn();
const del = jest.fn();
const update = jest.fn();
const pluck = jest.fn();

const transaction = jest.fn(async () => ({
  commit: jest.fn(),
  rollback: jest.fn(),
  where,
  select,
  pluck,
  del,
  update,
  insert,
  stream: jest.fn(),
}));

const db = jest.fn(() => ({
  select,
  where,
  insert,
  update,
  transaction,
  pluck,
  del,
  stream: jest.fn(),
}));

db.select = select;
db.where = where;
db.insert = insert;
db.transaction = transaction;
db.transaction.stream = jest.fn();
db.del = del;
db.update = update;
db.pluck = pluck;
db.stream = jest.fn();

module.exports = db;
