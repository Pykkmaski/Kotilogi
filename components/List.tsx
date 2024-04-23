import { SelectablesProvider, useSelectablesProviderContext } from './Util/SelectablesProvider';

type ListProps<T> = {
  data: T[];
  Component: React.FC<{ item: T }>;
};

export function List<T>({ data, Component }: ListProps<T>) {
  return data.map((item, index) => {
    return (
      <Component
        item={item}
        key={`list-item-${index}`}
      />
    );
  });
}
