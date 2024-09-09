import { render, screen } from '@testing-library/react';
import Page from '../page';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

jest.mock('axios');
jest.mock('next/navigation');
jest.mock('react-hot-toast');

describe('Testing password reset page step one.', () => {
  const testEmail = 'test@email.com';

  describe('Testing with valid email.', () => {
    beforeAll(async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        status: 200,
        data: {
          message: 'test_success',
        },
      });

      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(),
      });

      render(<Page />);
      const emailInput = screen.getByTestId('reset-pass-email-input');
      await userEvent.type(emailInput, testEmail);

      const submitBtn = screen.getByTestId('submit-btn');
      await userEvent.click(submitBtn);
      expect(submitBtn).toHaveAttribute('disabled');
    });

    afterAll(() => {
      (axios.get as jest.Mock).mockReset();
      (useSearchParams as jest.Mock).mockReset();
    });

    it('Calls axios.get with the correct route.', () => {
      expect(axios.get).toHaveBeenCalledWith(`/api/public/users/reset_password?email=${testEmail}`);
    });

    it('Notifies the user of the success.', () => {
      expect(toast.success).toHaveBeenCalled();
    });
  });

  describe('Testing with invalid email', () => {
    beforeAll(async () => {
      (axios.get as jest.Mock).mockRejectedValue({
        response: {
          status: 404,
          data: {
            message: 'test_failure',
          },
        },
      });

      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(),
      });

      render(<Page />);
      const emailInput = screen.getByTestId('reset-pass-email-input');
      await userEvent.type(emailInput, testEmail);

      const submitBtn = screen.getByTestId('submit-btn');
      await userEvent.click(submitBtn);
      //expect(submitBtn).toHaveAttribute('disabled');
    });

    it('Shows the invalid email text.', () => {
      expect(() => screen.getByTestId('invalid-email-text')).not.toThrow();
    });
  });
});

describe('Testing password reset step two.', () => {
  const testPassword = '12345678';
  const testToken = 'test_token';

  describe('Testing successful submission.', () => {
    beforeAll(async () => {
      (axios.post as jest.Mock).mockResolvedValue({
        status: 200,
      });

      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue(testToken),
      });

      render(<Page />);

      const passwordInput1 = screen.getByTestId('password-input1');
      await userEvent.type(passwordInput1, testPassword);
      expect(passwordInput1).toHaveValue(testPassword);

      const passwordInput2 = screen.getByTestId('password-input2');
      await userEvent.type(passwordInput2, testPassword);
      expect(passwordInput2).toHaveValue(testPassword);

      const submitBtn = screen.getByTestId('submit-btn');
      await userEvent.click(submitBtn);
    });

    afterAll(() => {
      (axios.post as jest.Mock).mockReset();
      (useSearchParams as jest.Mock).mockReset();
    });

    it('Calls axios.post with the correct route, and config.', () => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/public/users/reset_password',
        {
          password: testPassword,
        },
        expect.objectContaining({
          headers: {
            Authorization: `Bearer ${testToken}`,
          },
        })
      );
    });

    it('Notifies the user of the success.', () => {
      expect(toast.success).toHaveBeenCalled();
    });

    it('Redirects the user to the login page.', () => {
      const router = useRouter();
      expect(router.push).toHaveBeenCalledWith('/login');
    });
  });

  describe('Testing password mismatch.', () => {
    beforeAll(async () => {
      (axios.post as jest.Mock).mockResolvedValue({
        status: 200,
      });

      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue(testToken),
      });

      render(<Page />);

      const passwordInput1 = screen.getByTestId('password-input1');
      await userEvent.type(passwordInput1, testPassword);
      expect(passwordInput1).toHaveValue(testPassword);

      const passwordInput2 = screen.getByTestId('password-input2');
      const pass2 = testPassword + '1';
      await userEvent.type(passwordInput2, pass2);
      expect(passwordInput2).toHaveValue(pass2);

      const submitBtn = screen.getByTestId('submit-btn');
      await userEvent.click(submitBtn);
    });

    afterAll(() => {
      (axios.post as jest.Mock).mockReset();
      (useSearchParams as jest.Mock).mockReset();
    });

    it('Shows the password error text.', () => {
      expect(() => screen.getByTestId('password-error-text')).not.toThrow();
    });
  });
});
