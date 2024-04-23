import toast from 'react-hot-toast';
import Button from '../Button/Button';
import { Modal } from '../Experimental/Modal/PlainModal/Modal';
import { SelectablesProvider } from '../Util/SelectablesProvider';
import { VisibilityProvider } from '../Util/VisibilityProvider';
import { useToggle } from 'kotilogi-app/hooks/useToggle';
import { useState } from 'react';

export function ListHeader({ children }) {
  return <div className='flex justify-between items-center w-full mb-8'>{children}</div>;
}

export function ListBody({ children }) {
  return <div className='flex flex-col gap-2'>{children}</div>;
}

export function ListHeaderControlButtons({ children, ...props }) {
  const className = [
    props.hidden ? 'hidden' : 'flex',
    'items-center gap-4 text-lg animate-slideup-fast',
  ];

  return (
    <div
      {...props}
      className={className.join(' ')}>
      {children}
    </div>
  );
}

export function ResetSelectedButton() {
  return (
    <SelectablesProvider.ResetSelectedTrigger>
      <i
        className='fa fa-times cursor-pointer'
        title='Nollaa valinnat'
      />
    </SelectablesProvider.ResetSelectedTrigger>
  );
}

export function DeleteButton(props) {
  return (
    <i
      {...props}
      className='fa fa-trash text-red-700 cursor-pointer'
    />
  );
}

export function CancelSelectionButton(props) {
  return (
    <i
      {...props}
      className='fa fa-times text-slate-500 text-lg cursor-pointer'
      title='Kumoa valinnat...'
    />
  );
}
