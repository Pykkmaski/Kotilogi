'use client';

import { useToggle } from '@/hooks/useToggle';
import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';

type VisibilityProviderContextProps = {
  visible: boolean;
  toggleState: (state?: boolean) => void;
};

const VisibilityProviderContext = createContext<VisibilityProviderContextProps | null>(null);

type VisibilityProviderProps = React.PropsWithChildren & {
  visible?: boolean;
  toggleOverride?: (state?: boolean) => void;
};

export function VisibilityProvider({
  children,
  toggleOverride,
  ...props
}: VisibilityProviderProps) {
  const { state: visible, toggleState: toggle } = useToggle(false);
  const toggleState = (state?: boolean) => {
    if (toggleOverride) {
      toggleOverride(state);
    } else {
      toggle(state);
    }
  };

  return (
    <VisibilityProviderContext.Provider
      value={{ visible: props.visible !== undefined ? props.visible : visible, toggleState }}>
      {children}
    </VisibilityProviderContext.Provider>
  );
}

VisibilityProvider.Trigger = function ({ children }: React.PropsWithChildren) {
  const { toggleState } = useVisibilityProviderContext();

  return React.Children.map(children as React.ReactElement, (child: React.ReactElement) => {
    return React.cloneElement(child, {
      ...child.props,
      onClick: () => {
        if (child.props.onClick) {
          child.props.onClick();
        }

        toggleState();
      },
    });
  });
};

VisibilityProvider.Target = function ({ children }: React.PropsWithChildren) {
  const { visible } = useVisibilityProviderContext();
  return visible && children;
};

export function useVisibilityProviderContext() {
  const ctx = useContext(VisibilityProviderContext);
  if (!ctx)
    throw new Error(
      'useVisibilityProviderContext must be used within the scope of a VisibilityProviderContext!'
    );
  return ctx;
}
