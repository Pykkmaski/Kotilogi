'use client';

type SelectProps = React.ComponentProps<'select'> & {
  options: { name: string; id: number }[];
};

export const TypeIdSelector = ({ children, options, ...props }: SelectProps) => {
  return (
    <select {...props}>
      {options.map(option => (
        <option
          value={option.id}
          selected={props.value === option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
