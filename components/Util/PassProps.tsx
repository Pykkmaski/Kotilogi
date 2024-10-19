import React, { useMemo } from 'react';

/**Clones the children and passes whatever props are given, to them.
 * Uses useMemo internally to memoize the enhanced children.
 */
export function PassProps({ children, ...props }) {
  const enhancedChildren = useMemo(() => {
    return React.Children.map(children as React.ReactElement, child =>
      React.cloneElement(child, {
        ...child.props,
        ...props,
      })
    );
  }, [children, props]);

  return enhancedChildren;
}
