import React from 'react';

type RadioGroupProps = React.PropsWithChildren & {
  groupName: string;
};

export function RadioGroup({ children, groupName }: RadioGroupProps) {
  return React.Children.map(children as React.ReactElement, child => {
    return (
      <div className='flex flex-row gap-4'>
        {React.cloneElement(child, {
          ...child.props,
          name: groupName,
        })}
        <label>{child.props.value}</label>
      </div>
    );
  });
}
