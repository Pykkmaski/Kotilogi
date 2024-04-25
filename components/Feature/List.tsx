type ListProps<T> = {
  data: T[];
  Component: React.FC<{ item: T }>;
};

/**Maps through the passed data, rendering each item using the passed Component-prop */
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
