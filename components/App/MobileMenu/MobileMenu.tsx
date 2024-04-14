'use client';

import { OpenProvider } from '@/components/Util/ToggleProvider';
import style from './style.module.css';
import { useToggle } from 'kotilogi-app/hooks/useToggle';
import { createContext, useContext, useEffect, useRef } from 'react';
import { CallbackOnClickProvider } from '@/components/Util/CallbackOnClickProvider';
import React from 'react';

type MobileMenuContextProps = {
  open: boolean;
  toggleState: (state?: boolean) => void;
};

const MobileMenuContext = createContext<MobileMenuContextProps | null>(null);

function Button({ children }) {
  const { open, toggleState } = useMobileMenuContext();

  return (
    <OpenProvider open={open} openClassName={style.open}>
      {React.Children.map(children, (child: React.ReactElement) =>
        React.cloneElement(child, {
          ...child.props,
          onClick: () => {
            if (child.props.onClick) {
              child.props.onClick();
            }

            toggleState();
          },
        })
      )}
    </OpenProvider>
  );
}

function Body({ children }) {
  const { open, toggleState } = useMobileMenuContext();

  const bodyClassName = [style.body, 'z-70 shadow-md border border-slate-500'];

  return (
    <OpenProvider open={open} openClassName={style.open}>
      <div className={bodyClassName.join(' ')}>
        <CallbackOnClickProvider callback={() => toggleState(false)}>{children}</CallbackOnClickProvider>
      </div>
    </OpenProvider>
  );
}

export function MobileMenu({ children }) {
  const { toggled: open, toggleState } = useToggle(false);

  return <MobileMenuContext.Provider value={{ open, toggleState }}>{children}</MobileMenuContext.Provider>;
}

MobileMenu.Button = Button;
MobileMenu.Body = Body;

function useMobileMenuContext() {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) throw new Error('useMobileMenuContext must be used within the scope of a MobileMenuContext!');
  return ctx;
}
