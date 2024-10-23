import { screen, render } from '@testing-library/react';
import { RenderOnCondition } from '../RenderOnCondition';

describe('When the condition is met.', () => {
  beforeEach(() => {
    const content = <div data-testid='content'></div>;
    const fallback = <div data-testid='fallback'></div>;
    render(
      <RenderOnCondition
        condition={true}
        fallback={fallback}>
        {content}
      </RenderOnCondition>
    );
  });

  it('Renders the content when the condition is met.', () => {
    expect(() => screen.getByTestId('content')).not.toThrow();
  });

  it('Does not render the fallback.', () => {
    expect(() => screen.getByTestId('fallback')).toThrow();
  });
});

describe('When the condition is not met.', () => {
  beforeEach(() => {
    const content = <div data-testid='content'></div>;
    const fallback = <div data-testid='fallback'></div>;
    render(
      <RenderOnCondition
        condition={false}
        fallback={fallback}>
        {content}
      </RenderOnCondition>
    );
  });

  it('Does not render the content.', () => {
    expect(() => screen.getByTestId('content')).toThrow();
  });

  it('Does render the fallback.', () => {
    expect(() => screen.getByTestId('fallback')).not.toThrow();
  });
});
