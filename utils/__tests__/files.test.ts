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
