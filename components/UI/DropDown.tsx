'use client';

import { ToggleProvider } from '../Util/ToggleProvider';

export function DropDown({ children, title, initialState = false }) {
  return (
    <ToggleProvider initialState={initialState}>
      <div className='flex flex-col w-full'>
        <ToggleProvider.Trigger>
          <div className='flex items-center p-2 bg-white cursor-pointer'>{title}</div>
        </ToggleProvider.Trigger>
        <ToggleProvider.Target>{children}</ToggleProvider.Target>
      </div>
    </ToggleProvider>
  );
}

DropDown.Body = function ({ children, isToggled = false }) {
  return isToggled ? children : null;
};
