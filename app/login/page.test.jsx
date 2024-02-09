import {render, screen, fireEvent} from '@testing-library/react';
import Page from './page';

jest.mock('next/navigation');

test('Logging in with an invalid email displays the invalid email error', () => {
    render(<Page/>);
    const loginBtn = screen.getByTestId('login-btn');
    expect(loginBtn).toBeInTheDocument();

    jest.mock('./page', () => (
        {
            
        }
    ))
    fireEvent.click(loginBtn);

});