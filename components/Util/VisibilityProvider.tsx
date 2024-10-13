'use client';

import { useToggle } from '@/hooks/useToggle';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { createContext } from 'react';

type VisibilityProviderContextProps = {
  visible: boolean;
  toggleState: (state?: boolean) => void;
  trigger: React.ReactElement;
  updateTrigger: (el: React.ReactElement) => void;
};

const VisibilityProviderContext = createContext<VisibilityProviderContextProps | null>(null);

type VisibilityProviderProps = React.PropsWithChildren & {
  initVisibility?: () => boolean;
  toggleOverride?: (state?: boolean) => void;
};

export function VisibilityProvider({
  children,
  toggleOverride,
  initVisibility,
}: VisibilityProviderProps) {
  const { state: visible, toggleState: toggle } = useToggle(
    (initVisibility && initVisibility()) || false
  );
  const [trigger, setTrigger] = useState<React.ReactElement>(null);

  const toggleState = (state?: boolean) => {
    if (toggleOverride) {
      toggleOverride(state);
    } else {
      toggle(state);
    }
  };

  const updateTrigger = (el: React.ReactElement) => setTrigger(el);

  return (
    <VisibilityProviderContext.Provider
      value={{
        visible,
        toggleState,
        trigger,
        updateTrigger,
      }}>
      {children}
    </VisibilityProviderContext.Provider>
  );
}

/**Toggles the visibilty of the children of a VisibilityProvider.Target. */
VisibilityProvider.Trigger = function ({ children }: React.PropsWithChildren) {
  const { toggleState, trigger, updateTrigger } = useVisibilityProviderContext();
  if (React.Children.count(children) > 1) {
    throw new Error('A VisibilityProvider.Trigger can only have one child!');
  }

  const triggerElement = React.Children.toArray(children).at(0) as React.ReactElement;

  useEffect(() => {
    updateTrigger(
      React.cloneElement(triggerElement, {
        ...triggerElement.props,
        onClick: () => {
          if (triggerElement.props.onClick) {
            triggerElement.props.onClick();
          }

          toggleState();
        },
      })
    );
  }, []);

  return trigger;
};

/**Passes an isVisible prop to its children, when the Trigger is clicked. */
VisibilityProvider.Target = function ({ children }: React.PropsWithChildren) {
  const { visible } = useVisibilityProviderContext();
  return React.Children.map(children, (child: React.ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      isVisible: visible,
    })
  );
};

export function useVisibilityProviderContext() {
  const ctx = useContext(VisibilityProviderContext);
  if (!ctx)
    throw new Error(
      'useVisibilityProviderContext must be used within the scope of a VisibilityProviderContext!'
    );
  return ctx;
}
