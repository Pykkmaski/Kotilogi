'use client';

import React, { useMemo } from 'react';

/**Clones the children and passes whatever props are given to them.
 * Memoizes the cloned children.
 */
export function PassProps({ children, ...props }) {
  const enhancedChildren = useMemo(() => {
    return React.Children.map(children, (child: React.ReactElement) => {
      if (React.isValidElement(child as React.ReactElement)) {
        const newProps = {
          ...child.props,
          ...props,
        };

        return React.cloneElement(child, newProps);
      }
      return child;
    });
  }, [children, props]);

  return enhancedChildren;
}
