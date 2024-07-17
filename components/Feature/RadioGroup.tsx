import React from 'react';

type RadioGroupProps = React.PropsWithChildren & {
  groupName: string;
};

export function RadioGroup({ children, groupName }: RadioGroupProps) {
  return React.Children.map(children as React.ReactElement, child => {
    if (!child) return null;
    return (
      <div className='flex flex-row gap-4'>
        {React.cloneElement(child, {
          ...child.props,
          name: groupName,
        })}
      </div>
    );
  });
}

export function RadioButton({
  name,
  value,
  label,
  ...props
}: React.ComponentProps<'input'> & { label: string }) {
  return (
    <div className='flex flex-row gap-4'>
      <input
        name={name}
        value={value}
        {...props}
        type='radio'
      />
      <label>{label}</label>
    </div>
  );
}
