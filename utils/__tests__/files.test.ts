import { limit } from '@/uploadsConfig';
import { Files } from '../files';

describe('Testing the validation method.', () => {
  var files = null;
  beforeEach(() => {
    files = new Files('test');
  });

  it('Rejects non-jpeg -or pdf-files', () => {
    const testFile = {
      size: 1000,
      type: 'unsupported',
    };

    expect(() => {
      (files as any).validate(testFile);
    }).toThrow(/invalid type/);
  });

  it('Rejects files that are too large.', () => {
    const testFile = {
      type: 'image/jpeg',
      size: limit + 1,
    };

    expect(() => {
      (files as any).validate(testFile);
    }).toThrow(/invalid size/);
  });

  it('Accepts jpeg-images.', () => {
    const testFile = {
      type: 'image/jpeg',
    };

    expect(() => {
      (files as any).validate(testFile);
    }).not.toThrow();
  });

  it('Accepts PDF-files.', () => {
    const testFile = {
      type: 'application/pdf',
    };

    expect(() => {
      (files as any).validate(testFile);
    }).not.toThrow();
  });

  it('Accepts files that are at most as large as the defined limit.', () => {
    const testFile = {
      type: 'application/pdf',
      size: limit,
    };

    expect(() => {
      (files as any).validate(testFile);
    }).not.toThrow();
  });
});

describe('Testing the upload method.', () => {
  jest.mock('fs/promises', () => ({
    writeFile: jest.fn().mockImplementation(() => Promise.resolve()),
  }));

  it('Uploads supported files.', async () => {
    const arrayBufferMock = jest.spyOn(global.File.prototype, 'arrayBuffer');
    const bufferFromMock = jest.spyOn(global.Buffer.prototype, 'from');
    const filesAddBackupMock = jest.spyOn(Files.prototype as any, 'addBackup');

    const files = new Files('test');
    await (files as any).upload({ name: 'testFile', type: 'application/pdf', size: 100 } as File);
    expect(arrayBufferMock).toHaveBeenCalled();
  });
});
