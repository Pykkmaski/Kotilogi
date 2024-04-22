import { SelectablesProvider, useSelectablesProviderContext } from './Util/SelectablesProvider';

type ListProps<T> = {
  data: T[];
  Component: React.FC<{ item: T }>;
};

export function List<T>({ data, Component }: ListProps<T>) {
  return data.map((item, index) => {
    return <Component item={item} key={`list-item-${index}`} />;
  });
}

type SelectableItemsListProps<T> = ListProps<T> & {
  Component: React.FC<{ item: T; isSelected: boolean; onSelect: () => void }>;
};

export function SelectableItemsList<T>({ data, Component }: SelectableItemsListProps<T>) {
  const { selectedItems, selectItem } = useSelectablesProviderContext();
  return (
    <List
      data={data}
      Component={({ item }) => {
        const isSelected = selectedItems.has(item);
        return <Component item={item} isSelected={isSelected} onSelect={() => selectItem(item)} />;
      }}
    />
  );
}
