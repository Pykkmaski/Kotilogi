import {jest} from '@jest/globals';

const select = jest.fn().mockReturnThis();
const from = select;
const where = select;

const first = jest.fn();

module.exports = jest.fn(() => {
    return {
        select,
        from,
        where,
        first
    }
});

module.exports.select = select;
module.exports.from = from;
module.exports.where = where;
module.exports.first = first;


