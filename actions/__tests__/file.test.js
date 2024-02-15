import * as file from '../file';
const limit = require('../../uploadsConfig').limit;

describe('Testing the file-module', () => {
    describe('Testing the verifyFile-function', () => {

        it('Returns no_file if a file is not present', async () => {
            await expect(file.verifyFile()).resolves.toBe('no_file');
        });

        it('Returns invalid_type if an unsupported file is passed', async () => {
            const fileMock = jest.fn(() => ({type: 'invalid'}));

            global.File = fileMock;
            const testFile = new File([], 'testFile');
 
            await expect(file.verifyFile(testFile)).resolves.toBe('invalid_type');
        });

        it('Returns invalid_size if the file is bigger than allowed', async () => {
            const fileMock = jest.fn(() => ({size: limit + 1, type: 'application/pdf'}));
            global.File = fileMock;
            const testFile = new File([], 'testFile');

            await expect(file.verifyFile(testFile)).resolves.toBe('invalid_size');
        });

        it('Returns success when a pdf-file of a valid size is passed', async () => {
            const fileMock = jest.fn(() => ({size: limit, type: 'application/pdf'}));
            global.File = fileMock;
            const testFile = new File([], 'testFile');

            await expect(file.verifyFile(testFile)).resolves.toBe('success');
        });

        it('Returns success when an image of a valid size is passed', async () => {
            const fileMock = jest.fn(() => ({size: limit, type: 'image/jpeg'}));
            global.File = fileMock;
            const testFile = new File([], 'testFile');

            await expect(file.verifyFile(testFile)).resolves.toBe('success');
        });

    });
});