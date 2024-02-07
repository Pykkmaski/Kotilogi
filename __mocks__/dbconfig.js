const select = jest.fn().mockReturnThis();
const insert = jest.fn();
const from = select;
const where = select;

const first = jest.fn();

module.exports = jest.fn(() => {
    return {
        select,
        from,
        where,
        first,
        insert,
    }
});

module.exports.select = select;
module.exports.from = from;
module.exports.where = where;
module.exports.first = first;
module.exports.insert = insert;


