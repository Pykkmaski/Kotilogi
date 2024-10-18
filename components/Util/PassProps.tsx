import React from 'react';

/**Clones the children and passes whatever props are given, to them. */
export function PassProps({ children, ...props }) {
  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props,
    })
  );
}
