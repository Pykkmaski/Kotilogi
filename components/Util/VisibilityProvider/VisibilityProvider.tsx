'use client';

import { useToggle } from 'kotilogi-app/hooks/useToggle';
import React, { ReactElement, useContext, useEffect, useRef } from 'react';
import { createContext } from 'react';

const VisibilityContext = createContext<any>(null);

type VisibilityProviderProps = React.PropsWithChildren & {
  visible?: boolean;
};

/**Provides functionality to toggle the visibility of an element through another.*/
export function VisibilityProvider({ children, ...props }: VisibilityProviderProps) {
  const { toggled: visible, toggleState } = useToggle(props.visible !== undefined ? props.visible : false);

  useEffect(() => {
    toggleState(props.visible);
  }, [props.visible]);

  return <VisibilityContext.Provider value={{ visible, toggleState }}>{children}</VisibilityContext.Provider>;
}

/**Toggles the visibility of the Target.*/
function Trigger({ children }: React.PropsWithChildren) {
  const { toggleState } = useVisibilityProviderContext();

  return React.Children.map(children, (child: React.ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      onClick: () => {
        if (child.props.onClick) {
          child.props.onClick();
        }

        toggleState();
      },
    })
  );
}

VisibilityProvider.Trigger = Trigger;

/**The element to be displayed when the Trigger is clicked. */
function Target({ children }: React.PropsWithChildren & { hidesOnBlur?: boolean }) {
  const { visible } = useVisibilityProviderContext();

  return React.Children.map(children, (child: ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      hidden: !visible,
    })
  );
}

VisibilityProvider.Target = Target;

function useVisibilityProviderContext() {
  const context = useContext(VisibilityContext);
  if (!context) throw new Error('useVisibilityContextProvider must be used within the scope of a VisibilityContext!');
  return context;
}
