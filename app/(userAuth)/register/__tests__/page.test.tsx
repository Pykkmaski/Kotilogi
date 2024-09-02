import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Page from '../page';
import { MIN_PASSWORD_LENGTH, serviceName } from 'kotilogi-app/constants';
import { useRegister } from '../useRegister';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

jest.mock('next/navigation');
jest.mock('react-hot-toast');
jest.mock('axios', () => ({
  post: jest.fn(async () => Promise<{ status: number; data: any }>),
}));

describe('Testing the register page.', () => {
  const testEmail = 'test@email.com';
  const testPassword = '12345678';
  test('The tos-checkbox is marked as required', () => {
    render(<Page />);
    const tosCheckbox = screen.getByTestId('register-tos-checkbox');
    expect(tosCheckbox).toHaveAttribute('required');
  });

  describe('Testing successful submission.', () => {
    afterAll(() => {
      (axios.post as jest.Mock).mockReset();
    });

    beforeAll(async () => {
      (axios.post as jest.Mock).mockResolvedValue({
        status: 200,
        data: {
          message: 'Test success.',
        },
      });
      render(<Page />);

      const emailInput = screen.getByTestId('register-email-input');
      await userEvent.type(emailInput, testEmail);
      expect(emailInput).toHaveValue(testEmail);

      const passwordInput1 = screen.getByTestId('register-password1-input');
      await userEvent.type(passwordInput1, testPassword);
      expect(passwordInput1).toHaveValue(testPassword);

      const passwordInput2 = screen.getByTestId('register-password2-input');
      await userEvent.type(passwordInput2, testPassword);
      expect(passwordInput2).toHaveValue(testPassword);

      const tosCheckbox = screen.getByTestId('register-tos-checkbox');
      await userEvent.click(tosCheckbox);
      expect(tosCheckbox).toBeChecked();

      const submitBtn = screen.getByTestId('register-submit-btn');
      await userEvent.click(submitBtn);
    });

    it('Calls axios post with the correct arguments.', () => {
      expect(axios.post).toHaveBeenCalledWith('/api/public/users/register', {
        email: testEmail,
        password: testPassword,
      });
    });

    it('Redirects to the register/success page.', () => {
      const router = useRouter();
      expect(router.replace).toHaveBeenCalledWith('/register/success');
    });

    it('Shows the success toast.', () => {
      expect(toast.success).toHaveBeenCalled();
    });

    it('Does not display the email error text.', () => {
      expect(() => screen.getByTestId('email-error-text')).toThrow();
    });

    it('Does not display the password error text.', () => {
      expect(() => screen.getByTestId('password-error-text')).toThrow();
    });
  });

  describe('Testing submission of an email that is already registered.', () => {
    beforeAll(async () => {
      (axios.post as jest.Mock).mockRejectedValue({
        message: 'test error',
        response: {
          status: 409,
          data: {
            message: 'test error message',
          },
        },
      });

      render(<Page />);
      const emailInput = screen.getByTestId('register-email-input');
      await userEvent.type(emailInput, testEmail);
      expect(emailInput).toHaveValue(testEmail);

      const passwordInput1 = screen.getByTestId('register-password1-input');
      await userEvent.type(passwordInput1, testPassword);
      expect(passwordInput1).toHaveValue(testPassword);

      const passwordInput2 = screen.getByTestId('register-password2-input');
      await userEvent.type(passwordInput2, testPassword);
      expect(passwordInput2).toHaveValue(testPassword);

      const tosCheckbox = screen.getByTestId('register-tos-checkbox');
      await userEvent.click(tosCheckbox);
      expect(tosCheckbox).toBeChecked();

      const submitBtn = screen.getByTestId('register-submit-btn');
      await userEvent.click(submitBtn);
    });

    afterAll(() => {
      (axios.post as jest.Mock).mockReset();
    });

    it('Shows the user-exists error message below the email input.', () => {
      const emailError = screen.getByTestId('email-error-text');
      expect(emailError).toBeInTheDocument();
    });

    it('Does not show the password error text.', () => {
      expect(() => screen.getByTestId('password-error-text')).toThrow();
    });
  });

  describe('Testing a password mismatch.', () => {
    beforeAll(async () => {
      render(<Page />);
      const emailInput = screen.getByTestId('register-email-input');
      await userEvent.type(emailInput, testEmail);
      expect(emailInput).toHaveValue(testEmail);

      const passwordInput1 = screen.getByTestId('register-password1-input');
      await userEvent.type(passwordInput1, testPassword);
      expect(passwordInput1).toHaveValue(testPassword);

      const passwordInput2 = screen.getByTestId('register-password2-input');
      await userEvent.type(passwordInput2, testPassword + '1');
      expect(passwordInput2).toHaveValue(testPassword + '1');

      const tosCheckbox = screen.getByTestId('register-tos-checkbox');
      await userEvent.click(tosCheckbox);
      expect(tosCheckbox).toBeChecked();

      const submitBtn = screen.getByTestId('register-submit-btn');
      await userEvent.click(submitBtn);
    });

    it('Displays the password error text.', () => {
      expect(() => screen.getByTestId('password-error-text')).not.toThrow();
    });
  });
});
