import { expect } from "@jest/globals";
import {render, screen} from '@testing-library/react';
import Home from '../page';

it('Renders the welcome text', () => {
    render(<Home/>);
    const HeroText = screen.getByText('Talosi Huoltokirja');
    expect(HeroText).toBeInTheDocument();
});