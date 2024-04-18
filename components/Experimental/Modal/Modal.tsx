'use client';

import { useToggle } from 'kotilogi-app/hooks/useToggle';
import React from 'react';
import { createContext, forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';

type ModalContextProps = {
  open: boolean;
  toggleOpen: (state?: boolean) => void;
};

const ModalContext = createContext<ModalContextProps | null>(null);

/**
 * Closes the modal when the child is clicked. If the child has it's own onClick-event, that will be called first, and then the modal closes.
 * @param param0
 * @returns
 */
function CloseTrigger({ children }) {
  const { toggleOpen } = useModalContext();

  return React.Children.map(children, (child: React.ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      onClick: () => {
        if (child.props.onClick) {
          child.props.onClick();
        }

        toggleOpen(false);
      },
    })
  );
}

function Header({ children }) {
  return <div className='border-b border-slate-200 w-full flex items-center justify-between p-2 text-slate-500'>{children}</div>;
}

function Footer({ children }) {
  return <div className='border-t border-slate-200 w-full flex items-center justify-end p-2 gap-4'>{children}</div>;
}

function Body({ children }) {
  return <div className='w-full p-2'>{children}</div>;
}

type ModalProps = React.PropsWithChildren;

export type ModalRefType = {
  toggleOpen: (state?: boolean) => void;
};

function Modal({ children }: ModalProps, ref: React.Ref<ModalRefType>) {
  const { toggled: open, toggleState: toggleOpen } = useToggle(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    toggleOpen,
  }));

  useEffect(() => {
    const ref = dialogRef.current;
    if (!ref) return;

    if (open) {
      ref.showModal();
    } else {
      ref.close();
    }
  }, [open]);

  return (
    <ModalContext.Provider value={{ open, toggleOpen }}>
      <dialog ref={dialogRef} className='rounded-md overflow-hidden shadow-lg animate-slideup-fast xs:w-full lg:w-[900px]'>
        {children}
      </dialog>
    </ModalContext.Provider>
  );
}

Modal.CloseTrigger = CloseTrigger;
Modal.Header = Header;
Modal.Footer = Footer;
Modal.Body = Body;

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalContext must be used within the scope of a ModalContext!');
  return ctx;
}

export default Object.assign(forwardRef(Modal), {
  CloseTrigger,
  Header,
  Footer,
  Body,
});
