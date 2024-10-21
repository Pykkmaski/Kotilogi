import React, { useMemo } from 'react';
import { List } from '../../New/List';
import { PassProps } from '@/components/Util/PassProps';

type RadioGroupProps = React.PropsWithChildren & {
  name: string;
  required?: boolean;
};

/**Renders its provided radio-inputs inside a ul, automatically adding the name-prop on each child. */
export function RadioGroup({ children, name, required, ...props }: RadioGroupProps) {
  const content = useMemo(() => {
    const childArray = React.Children.toArray(children);
    return childArray.map((child: React.ReactElement) => {
      if (React.isValidElement(child as any)) {
        const newProps = {
          ...child.props,
          name,
          required,
        };

        return <PassProps {...newProps}>{child}</PassProps>;
      } else {
        return child;
      }
    });
  }, [children, props]);

  return (
    <List
      direction='row'
      gap={1}
      alignItems='center'
      wrap>
      {content}
    </List>
  );
}
