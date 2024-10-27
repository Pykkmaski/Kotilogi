import { useBatch } from '@/hooks/useBatch';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import { createContext, ReactElement, useCallback } from 'react';
import { PassProps } from '../Util/PassProps';
import { useChildCount } from '@/hooks/useChildCount';
import { useFirstChild } from '@/hooks/useFirstChild';

const BatchProviderContext = createContext(null);

type BatchProviderProps = React.PropsWithChildren & {};

export function BatchProvider({ children }: BatchProviderProps) {
  const { entries, removeEntry } = useBatch();
  const { data, updateData, resetData } = useFormOnChangeObject({});

  return (
    <BatchProviderContext.Provider value={{ data, updateData, removeEntry }}>
      {children}
    </BatchProviderContext.Provider>
  );
}

BatchProvider.DataSource = function ({ children }) {
  useChildCount(children, 1, 'BatchProvider.DataSource expects exactly one child!');
  const child = useFirstChild(children);
  const { updateData, data } = useBatchProviderContext();
  return (
    <PassProps
      onChange={updateData}
      data={data}>
      {child}
    </PassProps>
  );
};

type CommitTriggerProps = React.PropsWithChildren & {
  resetDataOnCommit?: boolean;
};

/**Passes an onClick-prop to it's child, to add the current contents of the DataSource into the batch. */
BatchProvider.CommitTrigger = function ({ children, resetDataOnCommit }: CommitTriggerProps) {
  useChildCount(children, 1, 'BatchProvider.CommitTrigger expects exactly one child!');
  const child = useFirstChild(children) as ReactElement;
  const { data, addEntry, resetData } = useBatchProviderContext();

  const onClick = useCallback(
    e => {
      child.props.onClick && child.props.onClick(e);
      addEntry(data);
      if (resetDataOnCommit) {
        resetData({});
      }
    },
    [data, addEntry, children, resetDataOnCommit]
  );

  return <PassProps onClick={onClick}>{child}</PassProps>;
};

/**Passes the current entries as a prop to it's children. */
BatchProvider.Entries = function ({ children }) {
  const { entries } = useBatchProviderContext();
  return <PassProps entries={entries}>{children}</PassProps>;
};

type DeleteTriggerProps = React.PropsWithChildren & {
  itemId: string;
};

/**Passes an onClick-prop to it's child that deletes the item with the specified id from the batch. */
BatchProvider.DeleteTrigger = function ({ children, itemId }: DeleteTriggerProps) {
  useChildCount(children, 1, 'BatchProvider.DeleteTrigger expects exactly one child!');
  const child = useFirstChild(children) as ReactElement;
  const { removeEntry } = useBatchProviderContext();

  const onClick = useCallback(
    e => {
      child.props.onClick && child.props.onClick(e);
      removeEntry(item => item.id === itemId);
    },
    [removeEntry, children]
  );

  return <PassProps onClick={onClick}>{child}</PassProps>;
};

const useBatchProviderContext = createUseContextHook('BatchProviderContext', BatchProviderContext);
