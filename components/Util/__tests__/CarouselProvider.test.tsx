import { fireEvent, render, screen } from '@testing-library/react';
import { CarouselProvider } from '../CarouselProvider';

describe('Rendering without a default slot name.', () => {
  beforeEach(() => {
    const carousel = (
      <CarouselProvider>
        <CarouselProvider.Slot slotName='first'>
          <span data-testid='first-slot' />
        </CarouselProvider.Slot>

        <CarouselProvider.Slot slotName='second'>
          <span data-testid='second-slot' />
        </CarouselProvider.Slot>

        <CarouselProvider.Slot slotName='third'>
          <span data-testid='third-slot' />
        </CarouselProvider.Slot>

        <CarouselProvider.NextTrigger>
          <button data-testid='next-button' />
        </CarouselProvider.NextTrigger>

        <CarouselProvider.PreviousTrigger>
          <button data-testid='previous-button' />
        </CarouselProvider.PreviousTrigger>
      </CarouselProvider>
    );

    render(carousel);
  });

  it('Displays the first slot by default.', () => {
    expect(() => screen.getByTestId('first-slot')).not.toThrow();
  });

  it('Does not render the other slots.', () => {
    expect(() => screen.getByTestId('second-slot')).toThrow();
    expect(() => screen.getByTestId('third-slot')).toThrow();
  });
});

describe('Testing the triggers.', () => {
  beforeEach(() => {
    const carousel = (
      <CarouselProvider>
        <CarouselProvider.Slot slotName='first'>
          <span data-testid='first-slot' />
        </CarouselProvider.Slot>

        <CarouselProvider.Slot slotName='second'>
          <span data-testid='second-slot' />
        </CarouselProvider.Slot>

        <CarouselProvider.Slot slotName='third'>
          <span data-testid='third-slot' />
        </CarouselProvider.Slot>

        <CarouselProvider.NextTrigger>
          <button data-testid='next-button' />
        </CarouselProvider.NextTrigger>

        <CarouselProvider.PreviousTrigger>
          <button data-testid='previous-button' />
        </CarouselProvider.PreviousTrigger>
      </CarouselProvider>
    );

    render(carousel);
  });

  test('Displays the first slot by default.', () => {
    expect(() => screen.getByTestId('first-slot')).not.toThrow();
    expect(() => screen.getByTestId('second-slot')).toThrow();
  });

  test('Steps forward, and backward correctly, and displays the correct slot.', () => {
    const nextBtn = screen.getByTestId('next-button');
    const previousBtn = screen.getByTestId('previous-button');

    fireEvent.click(nextBtn);
    expect(() => screen.getByTestId('first-slot')).toThrow();
    expect(() => screen.getByTestId('second-slot')).not.toThrow();
    expect(() => screen.getByTestId('third-slot')).toThrow();

    fireEvent.click(nextBtn);

    expect(() => screen.getByTestId('first-slot')).toThrow();
    expect(() => screen.getByTestId('second-slot')).toThrow();
    expect(() => screen.getByTestId('third-slot')).not.toThrow();

    fireEvent.click(previousBtn);

    expect(() => screen.getByTestId('first-slot')).toThrow();
    expect(() => screen.getByTestId('second-slot')).not.toThrow();
    expect(() => screen.getByTestId('third-slot')).toThrow();

    fireEvent.click(previousBtn);

    expect(() => screen.getByTestId('first-slot')).not.toThrow();
    expect(() => screen.getByTestId('second-slot')).toThrow();
    expect(() => screen.getByTestId('third-slot')).toThrow();
  });
});

describe('Rendering with a default slot name.', () => {
  beforeEach(() => {
    const carousel = (
      <CarouselProvider defaultSlot='second'>
        <CarouselProvider.Slot slotName='first'>
          <span data-testid='first-slot' />
        </CarouselProvider.Slot>

        <CarouselProvider.Slot slotName='second'>
          <span data-testid='second-slot' />
        </CarouselProvider.Slot>

        <CarouselProvider.Slot slotName='third'>
          <span data-testid='third-slot' />
        </CarouselProvider.Slot>

        <CarouselProvider.NextTrigger>
          <button data-testid='next-button' />
        </CarouselProvider.NextTrigger>

        <CarouselProvider.PreviousTrigger>
          <button data-testid='previous-button' />
        </CarouselProvider.PreviousTrigger>
      </CarouselProvider>
    );

    render(carousel);
  });

  it('Displays the slot with the same name as the defined default name, by default.', () => {
    expect(() => screen.getByTestId('second-slot')).not.toThrow();
  });

  it('Does not render the other slots.', () => {
    expect(() => screen.getByTestId('first-slot')).toThrow();
    expect(() => screen.getByTestId('third-slot')).toThrow();
  });
});

describe('Rendering unrelated children inside the provider.', () => {
  it('Does not throw an error.', () => {
    expect(() =>
      render(
        <CarouselProvider>
          <header>Header</header>
        </CarouselProvider>
      )
    ).not.toThrow();
  });

  it('Rendering the special components within unrelated children, should still make them be rendered.', () => {
    render(
      <CarouselProvider>
        <div>
          <CarouselProvider.Slot slotName='test'>
            <div data-testid='test-element' />
          </CarouselProvider.Slot>
        </div>
      </CarouselProvider>
    );

    expect(() => screen.getByTestId('test-element')).not.toThrow();
  });
});
