'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import React, { useMemo } from 'react';
import { createContext, useState } from 'react';
import { PassProps } from './PassProps';

const SelectablesProviderContext = createContext<{
  selectedItems: TODO[];
  toggleSelection: (item: unknown) => void;
  selectAll: (items: unknown) => void;
  resetSelected: () => void;
}>(null);

export function SelectablesProvider<T>({ children }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (item: T) => {
    setSelectedItems(prev => prev.filter(i => i !== item));
  };

  const selectAll = (items: T[]) => {
    setSelectedItems(items);
  };

  const resetSelected = () => {
    setSelectedItems([]);
  };

  return (
    <SelectablesProviderContext.Provider
      value={{ selectedItems, toggleSelection, selectAll, resetSelected }}>
      {children}
    </SelectablesProviderContext.Provider>
  );
}

type ActionTriggerProps = React.PropsWithChildren & {
  action: (selectedItems: TODO[]) => Promise<void> | void;
};

/**Use to trigger an action on the selected items when its child is clicked. */
SelectablesProvider.ActionTrigger = function ({ children, action, ...props }: ActionTriggerProps) {
  useMustHaveOneChild(children, 'SelectablesProvider.ActionTrigger expects exactly one child!');
  const { selectedItems, resetSelected } = useSelectablesProviderContext();
  const trigger = useFirstChild(children);

  return (
    <PassProps
      {...props}
      onClick={async e => {
        trigger.props.onClick && trigger.props.onClick(e);
        await action(selectedItems);
        resetSelected();
      }}>
      {trigger}
    </PassProps>
  );
};

/**Ads the item passed as a prop to the selectedItems. */
SelectablesProvider.SelectTrigger = function ({ children, item, ...props }) {
  useMustHaveOneChild(children, 'SelectablesProvider.SelectTrigger expects exactly one child!');
  const { toggleSelection, selectedItems } = useSelectablesProviderContext();
  const trigger = useFirstChild(children);

  return (
    <PassProps
      {...props}
      checked={selectedItems.includes(item)}
      onChange={() => {
        if (trigger.props.onClick) {
          trigger.props.onClick();
        }
        toggleSelection(item);
      }}>
      {trigger}
    </PassProps>
  );
};

SelectablesProvider.SelectAllTrigger = function ({ children, itemsToSelect, ...props }) {
  useMustHaveOneChild(children, 'SelectablesProvider.SelectAllTrigger expects exactly one child!');
  const { selectAll } = useSelectablesProviderContext();
  const child = useFirstChild(children);
  return (
    <PassProps
      {...props}
      onClick={() => selectAll(itemsToSelect)}>
      {child}
    </PassProps>
  );
};

SelectablesProvider.HideIfNoneSelected = function ({ children, ...props }) {
  const { selectedItems } = useSelectablesProviderContext();
  return (
    <PassProps
      {...props}
      hidden={!selectedItems.length}>
      {children}
    </PassProps>
  );
};

SelectablesProvider.DisabledIfNoneSelected = function ({ children, ...props }) {
  const { selectedItems } = useSelectablesProviderContext();
  return (
    <PassProps
      {...props}
      disabled={!selectedItems.length}>
      {children}
    </PassProps>
  );
};

SelectablesProvider.HighlightIfSelected = function ({ children, item }) {
  const { selectedItems } = useSelectablesProviderContext();
  return <PassProps selected={selectedItems.includes(item)}>{children}</PassProps>;
};

SelectablesProvider.ResetSelectedTrigger = function ({ children, ...props }) {
  const { resetSelected } = useSelectablesProviderContext();
  const [trigger] = useMemo(
    () => React.Children.toArray(children) as React.ReactElement[],
    [children]
  );

  return (
    <PassProps
      {...props}
      onClick={e => {
        if (trigger.props.onClick) {
          trigger.props.onClick();
        }
        resetSelected();
      }}>
      {trigger}
    </PassProps>
  );
};

SelectablesProvider.SelectedItems = function ({ Component }) {
  const { selectedItems } = useSelectablesProviderContext();
  return selectedItems.map(item => <Component item={item} />);
};

export const useSelectablesProviderContext = createUseContextHook(
  'SelectablesProviderContext',
  SelectablesProviderContext
);

function useMustHaveOneChild(children: React.ReactNode, errorMessage: string) {
  useMemo(() => {
    if (React.Children.count(children) !== 1) {
      throw new Error(errorMessage);
    }
  }, [children, errorMessage]);
}

function useFirstChild(children: React.ReactNode) {
  return useMemo(() => {
    const [child] = React.Children.toArray(children);
    return child as React.ReactElement;
  }, [children]);
}
