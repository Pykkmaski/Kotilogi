import { SelectablesProvider, useSelectablesProviderContext } from './Util/SelectablesProvider';

type ListProps<T> = {
  data: T[];
  Component: React.FC<{ item: T }>;
};

export function List<T>({ data, Component }: ListProps<T>) {
  return data.map(item => {
    return <Component item={item} />;
  });
}

type SelectableItemsListProps<T> = ListProps<T> & {
  Component: React.FC<{ item: T; onSelect: () => void }>;
};

export function SelectableItemsList<T>({ data, Component }: SelectableItemsListProps<T>) {
  const { selectItem } = useSelectablesProviderContext();
  return (
    <List
      data={data}
      Component={({ item }) => {
        return <Component item={item} onSelect={() => selectItem(item)} />;
      }}
    />
  );
}
