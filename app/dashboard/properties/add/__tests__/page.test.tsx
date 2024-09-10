import { render } from '@testing-library/react';
import Page from '../page';

describe('Testing the property add-page', () => {
  beforeAll(() => {
    render(<Page />);
  });
});
