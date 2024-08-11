import { fireEvent, render, screen } from '@testing-library/react';
import Page from '../page';
import { MIN_PASSWORD_LENGTH, serviceName } from 'kotilogi-app/constants';
import { registerUser } from '@/actions/users';
import { useRegister } from '../useRegister';

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock('@/actions/experimental/users');
jest.mock('../useRegister');

describe('Testing the email input', () => {
  var emailInput = null;

  beforeEach(() => {
    render(<Page />);
    emailInput = screen.getByTestId('register-email-input');
  });

  it('Gets rendered', () => {
    expect(emailInput).toBeInTheDocument();
  });

  it('Is marked as an email input', () => {
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('Is marked as required', () => {
    expect(emailInput).toHaveAttribute('required');
  });
});

describe('Testing the password1 input', () => {
  var passwordInput1 = null;

  beforeEach(() => {
    render(<Page />);
    passwordInput1 = screen.getByTestId('register-password1-input');
  });

  it('Gets rendered', () => {
    expect(passwordInput1).toBeInTheDocument();
  });

  it('Is marked as required', () => {
    expect(passwordInput1).toHaveAttribute('required');
  });

  it(`Must be at least ${MIN_PASSWORD_LENGTH} characters long`, () => {
    expect(passwordInput1).toHaveAttribute('minLength', MIN_PASSWORD_LENGTH.toString());
  });
});

describe('Testing the password2 input', () => {
  var passwordInput2 = null;

  beforeEach(() => {
    render(<Page />);
    passwordInput2 = screen.getByTestId('register-password2-input');
  });

  it('Gets rendered', () => {
    expect(passwordInput2).toBeInTheDocument();
  });

  it('Is marked as required', () => {
    expect(passwordInput2).toHaveAttribute('required');
  });
});

test('Displays the error text if passwords do not match.', () => {
  (useRegister as jest.Mock).mockReturnValueOnce({
    data: {},
    registerHandler: jest.fn(),
    status: 'password_mismatch',
    updateData: jest.fn(),
  });

  render(<Page />);

  const errorText = screen.getByTestId('password-error-text');
  expect(errorText).toBeInTheDocument();
});

describe('Testing the tos checkbox', () => {
  var tosCheckbox = null;

  beforeEach(() => {
    render(<Page />);
    tosCheckbox = screen.getByTestId('register-tos-checkbox');
  });

  it('Gets rendered', () => {
    expect(tosCheckbox).toBeInTheDocument();
  });

  it('Is marked as a checkbox input', () => {
    expect(tosCheckbox).toHaveAttribute('type', 'checkbox');
  });

  it('Is marked as required', () => {
    expect(tosCheckbox).toHaveAttribute('required');
  });
});

describe('Testing the register TOS-link', () => {
  var tosLink = null;

  beforeEach(() => {
    render(<Page />);
    tosLink = screen.getByTestId('register-tos-link');
  });

  it('Gets rendered', () => {
    expect(tosLink).toBeInTheDocument();
  });

  it('Links to the /tos page', () => {
    expect(tosLink).toHaveAttribute('href', '/tos');
  });
});

describe('Testing the cancel button', () => {
  var cancelButton = null;
  beforeEach(() => {
    render(<Page />);
    cancelButton = screen.getByTestId('register-cancel-btn');
  });

  it('Gets rendered', () => {
    expect(cancelButton).toBeInTheDocument();
  });

  it('Links to the home page', () => {
    expect(cancelButton).toHaveAttribute('href', '/');
  });
});

describe('Testing the submit button', () => {
  var submitButton = null;
  beforeEach(() => {
    render(<Page />);
    submitButton = screen.getByTestId('register-submit-btn');
  });

  it('Gets rendered', () => {
    expect(submitButton).toBeInTheDocument();
  });

  it('Is marked as a submit button', () => {
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});

describe('Testing the service name on the TOS prompt', () => {
  var serviceNameText = null;
  beforeEach(() => {
    render(<Page />);
    serviceNameText = screen.getByTestId('service-name');
  });

  it('Gets rendered', () => expect(serviceNameText).toBeInTheDocument());

  test('Contains the correct service name as text', () => {
    expect(serviceNameText).toHaveTextContent(serviceName);
  });
});

describe('Testing the register form', () => {
  var registerForm = null;

  beforeEach(() => {
    render(<Page />);
    registerForm = screen.getByTestId('register-form');
  });

  it('Gets rendered', () => {
    expect(registerForm).toBeInTheDocument();
  });
});

describe('Testing the email error text.', () => {
  it('Displays the email error message when the status is user_exists.', () => {
    (useRegister as jest.Mock).mockReturnValueOnce({
      status: 'user_exists',
      data: {},
      registerHandler: jest.fn(),
      updateData: jest.fn(),
    });

    render(<Page />);
    const errorText = screen.getByTestId('email-error-text');
    expect(errorText).toBeInTheDocument();
  });
});
