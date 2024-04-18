'use client';

import React, { useEffect, useRef } from 'react';

type ToggleProviderProps = React.PropsWithChildren & {
  open: boolean;
  openClassName: string;
};

/**
 * A component adding an open-class to it's children, to be used in menus and their buttons.
 * @param param0
 * @returns
 */
export function OpenProvider({ children, open, openClassName }: ToggleProviderProps) {
  const childRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ref = childRef.current;
    if (ref) {
      if (open) {
        ref.classList.add(openClassName);
      } else {
        ref.classList.remove(openClassName);
      }
    }
  }, [open]);

  return React.Children.map(children, (child: React.ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      ref: childRef,
    })
  );
}
