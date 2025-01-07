import React, { useMemo } from 'react';
import { Spacer, SpacerProps } from '../UI/Spacer';

/**A Spacer-component that wraps it's children inside li-elements, and renders them inside a ul-tag. */
export function List({ children, ...props }: SpacerProps) {
  const content = useMemo(() => {
    return React.Children.toArray(children).map((child: React.ReactElement) => {
      const children = (child.props as TODO).children;
      if (children) {
        return React.Children.map(children, c => <li>{c}</li>);
      } else {
        return <li>{child}</li>;
      }
    });
  }, [children]);

  return (
    <Spacer
      {...props}
      as='ul'>
      {content}
    </Spacer>
  );
}
