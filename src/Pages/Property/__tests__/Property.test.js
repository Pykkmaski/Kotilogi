import {render, screen} from 'react-test-renderer';
import {userEvent} from '@testing-library/'
import Property from '../Property';

describe('Property page', () => {
    const pageComponent = renderer.create(<Property/>);
    describe('Navbar', () => {
        
        it('Contains the link to the property info section', () => {
            expect()
        });
    })
})