const where = jest.fn().mockReturnThis();
const select = where;
const insert = jest.fn();
const del = jest.fn();
const update = jest.fn();
const pluck = jest.fn();
const transaction = jest.fn(() => ({
  commit: jest.fn(),
  rollback: jest.fn(),
}));

const db = jest.fn(() => ({
  select,
  where,
  insert,
  update,
  transaction,
  pluck,
  del,
}));

db.select = select;
db.where = where;
db.insert = insert;
db.transaction = transaction;
db.del = del;
db.update = update;
db.pluck = pluck;

module.exports = db;
