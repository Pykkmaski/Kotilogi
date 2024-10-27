'use client';

import { useToggle } from '@/hooks/useToggle';
import React, {
  cloneElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createContext } from 'react';
import { PassProps } from './PassProps';
import { createContextWithHook } from 'kotilogi-app/utils/createContextWithHook';

type VisibilityProviderContextProps = {
  visible: boolean;
  toggleState: (state?: boolean) => void;
  anchorEl: Element | null;
  updateAnchorEl: (e: any) => void;
};

export const [VisibilityProviderContext, useVisibilityProviderContext] =
  createContextWithHook<VisibilityProviderContextProps>('VisibilityProviderContext');

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

  const toggleState = useCallback(
    (state?: boolean) => {
      if (toggleOverride) {
        toggleOverride(state);
      } else {
        toggle(state);
      }
    },
    [toggleOverride, toggle]
  );

  const updateAnchorEl = useCallback((e: any) => setAnchorEl(e.currentTarget), []);

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
  const childCount = useMemo(() => React.Children.count(children), [children]);

  if (childCount > 1) {
    throw new Error('A VisibilityProvider.Trigger must have exactly one child!');
  }
  const anchorCreated = useRef(false);
  const { toggleState, updateAnchorEl, anchorEl } = useVisibilityProviderContext();

  if (setAsAnchorForMUI && anchorEl != null && anchorCreated.current == false) {
    throw new Error('The VisibiltyProvider in scope already has a trigger as a reference!');
  }

  const [trigger] = useMemo(
    () => React.Children.toArray(children) as [React.ReactElement],
    [children]
  );

  return (
    <PassProps
      {...trigger.props}
      onClick={e => {
        console.log('clicking');
        trigger.props.onClick && trigger.props.onClick(e);
        if (setAsAnchorForMUI) {
          updateAnchorEl(e);
          anchorCreated.current = true;
        }
        toggleState();
      }}>
      {trigger}
    </PassProps>
  );
};

/**Passes an isVisible prop to its children, when the Trigger is clicked. */
VisibilityProvider.Target = function ({ children }: React.PropsWithChildren) {
  const { visible } = useVisibilityProviderContext();
  return <PassProps isVisible={visible}>{children}</PassProps>;
};
