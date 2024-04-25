import { Input } from '../Input/Input';
import {SingleInputForm} from './SingleInputForm';
import {screen, render, fireEvent} from '@testing-library/react';

const renderTheElement = () => {
    return render(<SingleInputForm 
        inputComponent={Input} 
        submitMethod={(value) => Promise.resolve({})}
        initialInputProps={{}}
    />);
}

describe('Testing the SingleInputForm', () => {
    it('Becomes enabled when pressing the edit button', () => {
        const element = renderTheElement();

        const editButton = element.getByTestId('edit-btn');
        const input = element.getByTestId('input');
        expect(input).toBeInTheDocument();
        fireEvent.click(editButton);
        expect(input).not.toHaveAttribute('disabled');
    });

    it('Initially has the cancel button hidden', () => {
        const element = renderTheElement();
        expect(() => element.getByTestId('cancel-btn')).toThrow();
    });
});