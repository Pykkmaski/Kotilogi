import React from 'react';
import { Spacer, SpacerProps } from './Spacer';

/**A Spacer-component that wraps it's children inside li-elements, and renders them inside a ul-tag. */
export function List({ children, ...props }: SpacerProps) {
  return (
    <Spacer
      {...props}
      as='ul'>
      {React.Children.map(children, child => (
        <li>{child}</li>
      ))}
    </Spacer>
  );
}
