import {expect} from "@jest/globals";
import {render, screen} from '@testing-library/react';
import Page from './page';
import { MIN_PASSWORD_LENGTH } from 'kotilogi-app/constants';
import '@testing-library/jest-dom/extend-expect';

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
}));

describe('Testing the email input', () => {
    var emailInput = null;

    beforeEach(() => {
        render(<Page/>);
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
        render(<Page/>);
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
        render(<Page/>);
        passwordInput2 = screen.getByTestId('register-password2-input');
    });

    it('Gets rendered', () => {
        expect(passwordInput2).toBeInTheDocument();
    });

    it('Is marked as required', () => {
        expect(passwordInput2).toHaveAttribute('required');
    });
});

describe('Testing the tos checkbox', () => {
    var tosCheckbox = null;

    beforeEach(() => {
        render(<Page/>);
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
        render(<Page/>);
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
        render(<Page/>);
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
        render(<Page/>);
        submitButton = screen.getByTestId('register-submit-btn');
    });

    it('Gets rendered', () => {
        expect(submitButton).toBeInTheDocument();
    });

    it('Is marked as a submit button', () => {
        expect(submitButton).toHaveAttribute('type', 'submit');
    });
});

describe('Testing the register form', () => {
    var registerForm = null;

    beforeEach(() => {
        render(<Page/>);
        registerForm = screen.getByTestId('register-form');
    });

    it('Gets rendered', () => {
        expect(registerForm).toBeInTheDocument();
    });
});



