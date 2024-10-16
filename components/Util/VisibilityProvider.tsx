'use client';

import { useToggle } from '@/hooks/useToggle';
import React, { cloneElement, useContext, useEffect, useRef, useState } from 'react';
import { createContext } from 'react';

type VisibilityProviderContextProps = {
  visible: boolean;
  toggleState: (state?: boolean) => void;
  anchorEl: Element | null;
  updateAnchorEl: (e: any) => void;
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
  const [anchorEl, setAnchorEl] = useState<Element>(null);

  const toggleState = (state?: boolean) => {
    if (toggleOverride) {
      toggleOverride(state);
    } else {
      toggle(state);
    }
  };

  const updateAnchorEl = (e: any) => setAnchorEl(e.currentTarget);

  return (
    <VisibilityProviderContext.Provider
      value={{
        visible,
        toggleState,
        anchorEl,
        updateAnchorEl,
      }}>
      {children}
    </VisibilityProviderContext.Provider>
  );
}

type TriggerProps = React.PropsWithChildren & {
  /**Tells the trigger to set itself as an anchor element, usable by material ui menus to position themselves.
   * Each VisibilityProvider can only have one trigger with this set to true. */
  setAsAnchorForMUI?: boolean;
};

/**Toggles the visibilty of the children of a VisibilityProvider.Target. */
VisibilityProvider.Trigger = function ({ children, setAsAnchorForMUI = false }: TriggerProps) {
  if (React.Children.count(children) > 1) {
    throw new Error('A VisibilityProvider.Trigger must have exactly one child!');
  }
  const anchorCreated = useRef(false);
  const { toggleState, updateAnchorEl, anchorEl } = useVisibilityProviderContext();

  if (setAsAnchorForMUI && anchorEl != null && anchorCreated.current == false) {
    throw new Error('The VisibiltyProvider in scope already has a trigger as a reference!');
  }

  const [trigger] = React.Children.toArray(children) as [React.ReactElement];

  return React.cloneElement(trigger, {
    ...trigger.props,
    onClick: e => {
      trigger.props.onClick && trigger.props.onClick(e);
      if (setAsAnchorForMUI) {
        updateAnchorEl(e);
        anchorCreated.current = true;
      }
      toggleState();
    },
  });
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
