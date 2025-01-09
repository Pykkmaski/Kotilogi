import { render, screen } from '@testing-library/react';
import { HighlightingNavbarProvider } from '../HighlightingNavbarProvider';

const testpath = 'testpath';

jest.mock('next/navigation', () => ({
  usePathname: () => testpath,
}));

test('Throws an error if more than one child is passed to a link.', () => {
  expect(() =>
    render(
      <HighlightingNavbarProvider>
        <HighlightingNavbarProvider.Link>
          <a href='' />
          <a href='' />
        </HighlightingNavbarProvider.Link>
      </HighlightingNavbarProvider>
    )
  ).toThrow(/Only one child/);
});
