import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { createContext, useState } from 'react';

const SelectablesProviderContext = createContext<{
  selectedItems: Set<unknown>;
  selectItem: (item: unknown) => void;
}>(null);

export function SelectablesProvider<T>({ children }) {
  const [selectedItems, setSelectedItems] = useState(new Set<T>());

  const selectItem = (item: T) => {
    setSelectedItems(prev => {
      if (prev.has(item)) {
        prev.delete(item);
      } else {
        prev.add(item);
      }
      return prev;
    });
  };

  return (
    <SelectablesProviderContext.Provider value={{ selectedItems, selectItem }}>
      {children}
    </SelectablesProviderContext.Provider>
  );
}

export const useSelectablesProviderContext = createUseContextHook(
  'SelectablesProviderContext',
  SelectablesProviderContext
);
