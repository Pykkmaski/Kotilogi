'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import React from 'react';
import { createContext, useState } from 'react';
import { PassProps } from './PassProps';

const SelectablesProviderContext = createContext<{
  selectedItems: TODO[];
  selectItem: (item: unknown) => void;
  selectAll: (items: unknown) => void;
  resetSelected: () => void;
}>(null);

export function SelectablesProvider<T>({ children }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const selectItem = (item: T) => {
    setSelectedItems(prev => {
      const newItems = [...prev];
      const index = newItems.findIndex(entry => entry == item);
      if (index != -1) {
        newItems.splice(index, 1);
      } else {
        newItems.push(item);
      }
      return newItems;
    });
  };

  const selectAll = (items: T[]) => {
    setSelectedItems(items);
  };

  const resetSelected = () => {
    setSelectedItems([]);
  };

  return (
    <SelectablesProviderContext.Provider
      value={{ selectedItems, selectItem, selectAll, resetSelected }}>
      {children}
    </SelectablesProviderContext.Provider>
  );
}

type ActionTriggerProps = React.PropsWithChildren & {
  action: (selectedItems: TODO[]) => Promise<void> | void;
};

SelectablesProvider.ActionTrigger = function ({ children, action, ...props }: ActionTriggerProps) {
  const { selectedItems, resetSelected } = useSelectablesProviderContext();
  const [trigger] = React.Children.toArray(children) as React.ReactElement[];

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
  if (React.Children.count(children) != 1) {
    throw new Error('SelectablesProvider.SelectTrigger must have exactly one child!');
  } else {
    React.Children.forEach(children as React.ReactElement, child => {
      if (child.type !== 'input' || child.props.type !== 'checkbox') {
        throw new Error(
          'Only checkbox inputs can be passed to a SelectablesProvider.SelectTrigger!'
        );
      }
    });
  }
  const { selectItem, selectedItems } = useSelectablesProviderContext();
  const [trigger] = React.Children.toArray(children) as React.ReactElement[];

  return (
    <PassProps
      {...props}
      checked={selectedItems.includes(item)}
      onChange={() => {
        selectItem(item);
        if (trigger.props.onClick) {
          trigger.props.onClick();
        }
      }}>
      {trigger}
    </PassProps>
  );
};

SelectablesProvider.SelectAllTrigger = function ({ children, itemsToSelect, ...props }) {
  const { selectAll } = useSelectablesProviderContext();
  return (
    <PassProps
      {...props}
      onClick={() => selectAll(itemsToSelect)}>
      {children}
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
  const [trigger] = React.Children.toArray(children) as React.ReactElement[];
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
