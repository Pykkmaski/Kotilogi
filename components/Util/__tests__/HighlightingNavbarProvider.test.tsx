import { render, screen } from '@testing-library/react';
import { HighlightingNavbarProvider } from '../HighlightingNavbarProvider';
import { usePathname } from 'next/navigation';
import { FooterNav } from '@/components/Feature/FooterNav';

const testpath = 'testpath';

jest.mock('next/navigation', () => ({
  usePathname: () => testpath,
}));

test('A .Link adds the selected-prop it its child when on the same path as the childs href.', () => {
  const component = (
    <HighlightingNavbarProvider>
      <HighlightingNavbarProvider.Link href={testpath}>
        <FooterNav.Link
          data-testid='link'
          href={testpath}
        />
      </HighlightingNavbarProvider.Link>
    </HighlightingNavbarProvider>
  );

  render(component);
  const link = screen.getByTestId('link');
  expect(link).toBeInTheDocument();
  expect(link).toHaveClass('text-orange-300');
});

test('A .Link does not add the selected-prop to its child when not on the same path as the childs href.', () => {
  const component = (
    <HighlightingNavbarProvider>
      <HighlightingNavbarProvider.Link href={'someotherpath'}>
        <FooterNav.Link data-testid='link2' />
      </HighlightingNavbarProvider.Link>
    </HighlightingNavbarProvider>
  );

  render(component);
  const link = screen.getByTestId('link2');
  expect(link).toBeInTheDocument();
  expect(link).not.toHaveAttribute('selected');
  expect(link).not.toHaveClass('text-orange-300');
});
