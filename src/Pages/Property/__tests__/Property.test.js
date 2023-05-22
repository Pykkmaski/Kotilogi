import {render, screen, cleanup} from '@testing-library/react';
import Property from '../Property';

/**
 * @jest-environment jsdom
 */

test('Should render all components', () => {
    render(<Property/>);
});