module.exports = jest.fn((a, b) => Promise.resolve(a === b));