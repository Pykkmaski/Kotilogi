import { render } from '@testing-library/react';
import Page from '../page';
import { useLogin } from '../useLogin';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('../useLogin');
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
  useRouter: jest.fn(),
}));

describe('Testing the email error text', () => {
  it('Is displayed when the status indicates an invalid user.', () => {
    (useLogin as jest.Mock).mockReturnValueOnce({
      status: 'invalid_user',
      updateData: jest.fn(),
      loginHandler: jest.fn(),
    });

    const { getByTestId } = render(<Page />);
    const errorText = getByTestId('invalid-user-error');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveTextContent('Käyttäjää annetulla sähköpostiosoitteella ei ole!');
  });

  it('Is displayed when the status indicates an inactive user.', () => {
    (useLogin as jest.Mock).mockReturnValueOnce({
      status: 'user_inactive',
      updateData: jest.fn(),
      loginHandler: jest.fn(),
    });

    const { getByTestId } = render(<Page />);
    const errorText = getByTestId('inactive-user-error');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveTextContent('Käyttäjätili on poistettu käytöstä!');
  });
});

describe('Testing the password error text.', () => {
  it('Is displayed when the status indicates an invalid password.', () => {
    (useLogin as jest.Mock).mockReturnValueOnce({
      status: 'password_mismatch',
      updateData: jest.fn(),
      loginHandler: jest.fn(),
    });

    const { getByTestId } = render(<Page />);
    const errorText = getByTestId('password-mismatch-error');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveTextContent('Salasana on virheellinen!');
  });
});

describe('Testing the password reset link.', () => {
  it('Is rendered and has an href pointing to /login/reset.', () => {
    const { getByTestId } = render(<Page />);
    const passwordResetLink = getByTestId('password-reset-link');
    expect(passwordResetLink).toBeInTheDocument();
    expect(passwordResetLink).toHaveAttribute('href', '/login/reset');
  });
});

describe('Testing data submission.', () => {
  it('Submits the data collected from the fields.', () => {
    const { getByTestId } = render(<Page />);
  });
});
