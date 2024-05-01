import { limit } from '@/uploadsConfig';
import { Files } from '../files';

describe('Testing the validation method.', () => {
  it('Rejects non-jpeg -or pdf-files', () => {
    const files = new Files('testTable');
    const testFile = {
      size: 1000,
      type: 'unsupported',
    };
  });
});
