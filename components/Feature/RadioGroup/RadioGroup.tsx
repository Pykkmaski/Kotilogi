import React from 'react';
import { List } from '../../New/List';

type RadioGroupProps = React.PropsWithChildren & {
  name: string;
};

/**Renders its provided radio-inputs inside a ul, automatically adding the name-prop on each child. */
export function RadioGroup({ children, name, ...props }: RadioGroupProps) {
  return (
    <List
      direction='row'
      gap={2}
      alignItems='center'
      wrap>
      {React.Children.map(children as React.ReactElement, (child, index) => {
        if (!child) return null;

        return React.cloneElement(child, {
          ...props,
          ...child.props,
          name,
        });
      })}
    </List>
  );
}
