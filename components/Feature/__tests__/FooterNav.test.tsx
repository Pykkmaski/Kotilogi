import { FooterNav } from '../FooterNav';
import { screen, render } from '@testing-library/react';
import { usePathname } from 'next/navigation';

const testpath = 'testpath';

jest.mock('next/navigation', () => ({
  usePathname: () => testpath,
}));

test('Adds the text-orange-500-class to its children when on the pathname equal to the childs href, and not on the ones that have a different href.', () => {
  const component = (
    <FooterNav>
      <FooterNav.Link
        data-testid='selected-link'
        href={testpath}
      />
      <FooterNav.Link
        data-testid='unselected-link'
        href='unselected'
      />
    </FooterNav>
  );

  const { getByTestId } = render(component);
  const selectedLink = getByTestId('selected-link');
  const unselectedLink = getByTestId('unselected-link');

  const textClass = 'text-orange-300';
  expect(selectedLink).toHaveClass(textClass);
  expect(unselectedLink).not.toHaveClass(textClass);
});

test('A FooterNav.Link does not have the text-orange-300 class when created without a selected-prop', () => {
  const testId = 'footernav-link';

  const { getByTestId } = render(
    <FooterNav.Link
      href=''
      data-testid={testId}
    />
  );

  const link = getByTestId(testId);
  expect(link).not.toHaveClass('text-orange-300');
});
