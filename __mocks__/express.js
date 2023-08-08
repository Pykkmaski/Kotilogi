exports.res = {
    sendStatus : jest.fn((status) => status),
    status: jest.fn().mockReturnThis(),
    send: jest.fn((data) => data),
}

exports.req = {
    body: undefined,
}