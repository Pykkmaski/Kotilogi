import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { useSession } from 'next-auth/react';
import React from 'react';
import { createContext } from 'react';

const UpdateSessionProviderContext = createContext<{
  update;
}>(null);

export function UpdateSessionProvider({ children }) {
  const { update } = useSession();
  return (
    <UpdateSessionProviderContext.Provider value={{ update }}>
      {children}
    </UpdateSessionProviderContext.Provider>
  );
}

UpdateSessionProvider.Trigger = function ({ children, withData, ...props }) {
  const { update } = useUpdateSessionProviderContext();

  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props,
      onClick: async () => await update(withData),
    })
  );
};

const useUpdateSessionProviderContext = createUseContextHook(
  'UpdateSessionProviderContext',
  UpdateSessionProviderContext
);
