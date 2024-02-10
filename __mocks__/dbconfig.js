const select = jest.fn().mockReturnThis();
const insert = jest.fn();
const from = select;
const where = select;

const first = jest.fn();

const dbMock = jest.fn(() => {
    return {
        select,
        from,
        where,
        first,
        insert,
    };
});

dbMock.select = select;
dbMock.from = from;
dbMock.where = where;
dbMock.first = first;
dbMock.insert = insert;

module.exports = dbMock;
