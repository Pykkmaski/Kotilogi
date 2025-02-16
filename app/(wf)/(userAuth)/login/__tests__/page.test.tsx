import { render, screen } from '@testing-library/react';
import Page from '../page.old';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';

jest.mock('next/navigation');
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('Testing the login page.', () => {
  const testEmail = 'test@email.com';
  const testPassword = '12345678';

  describe('Testing a succesful login.', () => {
    beforeAll(async () => {
      (signIn as jest.Mock).mockResolvedValue({
        err: null,
      });
      render(<Page />);

      const emailInput = screen.getByTestId('login-email-input');
      await userEvent.type(emailInput, testEmail);
      //expect(emailInput).toHaveValue(testEmail);

      const passwordInput = screen.getByTestId('login-password-input');
      await userEvent.type(passwordInput, testPassword);
      //expect(passwordInput).toHaveValue(testPassword);

      const loginBtn = screen.getByTestId('login-submit-btn');
      await userEvent.click(loginBtn);
    }, 10000);

    afterAll(() => (signIn as jest.Mock).mockReset());

    it('Calls signIn with the email, password and redirect set to false.', () => {
      expect(signIn).toHaveBeenCalledWith(
        'credentials',
        expect.objectContaining({
          email: testEmail,
          password: testPassword,
          redirect: false,
        })
      );
    }, 10000);

    it('Redirects to the dashboard page.', () => {
      const router = useRouter();
      expect(router.push).toHaveBeenCalledWith('/dashboard');
    }, 10000);
  });

  describe('Testing login with invalid email.', () => {
    beforeAll(async () => {
      (signIn as jest.Mock).mockResolvedValue({
        error: 'invalid_user',
      });

      render(<Page />);
      const emailInput = screen.getByTestId('login-email-input');
      await userEvent.type(emailInput, testEmail);
      //expect(emailInput).toHaveValue(testEmail);

      const passwordInput = screen.getByTestId('login-password-input');
      await userEvent.type(passwordInput, testPassword);
      //expect(passwordInput).toHaveValue(testPassword);

      const loginBtn = screen.getByTestId('login-submit-btn');
      await userEvent.click(loginBtn);
    });

    it('Shows the invalid user text.', () => {
      expect(() => screen.getByTestId('invalid-email-text')).not.toThrow();
    });
  });

  describe('Testing login with invalid password.', () => {
    beforeAll(async () => {
      (signIn as jest.Mock).mockResolvedValue({
        error: 'password_mismatch',
      });

      render(<Page />);
      const emailInput = screen.getByTestId('login-email-input');
      await userEvent.type(emailInput, testEmail);
      //expect(emailInput).toHaveValue(testEmail);

      const passwordInput = screen.getByTestId('login-password-input');
      await userEvent.type(passwordInput, testPassword);
      //expect(passwordInput).toHaveValue(testPassword);

      const loginBtn = screen.getByTestId('login-submit-btn');
      await userEvent.click(loginBtn);
    });

    it('Shows the invalid password text.', () => {
      expect(() => screen.getByTestId('invalid-password-text')).not.toThrow();
    });
  });

  describe('Testing the password reset link.', () => {
    it('Contains the reset password link.', () => {
      render(<Page />);
      expect(() => screen.getByTestId('password-reset-link')).not.toThrow();
    });

    it('Links to the login/reset page', () => {
      render(<Page />);
      const link = screen.getByTestId('password-reset-link');
      expect(link).toHaveAttribute('href', '/login/reset');
    });
  });
});
