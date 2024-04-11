const where = jest.fn().mockReturnThis();
const select = where;
const insert = jest.fn();
const transaction = jest.fn().mockReturnThis();

const db = jest.fn(() => ({
  select,
  where,
  insert,
  transaction,
}));

db.select = select;
db.where = where;
db.insert = insert;
db.transaction = transaction;

module.exports = db;
