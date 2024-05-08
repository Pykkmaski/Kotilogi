'use client';

import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import React from 'react';
import { createContext, useState } from 'react';

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

  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props,
      onClick: async () => {
        await action(selectedItems);

        if (child.props.onClick) {
          child.props.onClick();
        }
        resetSelected();
      },
    })
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

  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props,
      checked: selectedItems.includes(item),
      onChange: () => {
        selectItem(item);
        if (child.props.onClick) {
          child.props.onClick();
        }
      },
    })
  );
};

SelectablesProvider.SelectAllTrigger = function ({ children, itemsToSelect, ...props }) {
  const { selectAll } = useSelectablesProviderContext();
  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props,
      onClick: () => selectAll(itemsToSelect),
    })
  );
};

SelectablesProvider.HideIfNoneSelected = function ({ children, ...props }) {
  const { selectedItems } = useSelectablesProviderContext();
  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props,
      hidden: !selectedItems.length,
    })
  );
};

SelectablesProvider.DisabledIfNoneSelected = function ({ children, ...props }) {
  const { selectedItems } = useSelectablesProviderContext();
  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props,
      disabled: !selectedItems.length,
    })
  );
};

SelectablesProvider.HighlightIfSelected = function ({ children, item }) {
  const { selectedItems } = useSelectablesProviderContext();
  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      selected: selectedItems.includes(item),
    })
  );
};

SelectablesProvider.ResetSelectedTrigger = function ({ children, ...props }) {
  const { resetSelected } = useSelectablesProviderContext();
  return React.Children.map(children as React.ReactElement, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props,
      onClick: () => {
        if (child.props.onClick) {
          child.props.onClick();
        }
        resetSelected();
      },
    })
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
