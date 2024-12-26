import React, { useMemo } from 'react';
import { List } from '../../New/List';
import { PassProps } from '@/components/Util/PassProps';

type RadioGroupProps = React.PropsWithChildren & {
  name: string;
  required?: boolean;
};

/**Renders its provided radio-inputs inside a ul.
 * @todo It should pass the name prop to its children. Currently it does not work.
 */
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
  }, [children, props, name, required]);

  return <div className='grid lg:grid-cols-3 xs:grid-cols-2 gap-2'>{content}</div>;
}

/**
 * <List
      direction='row'
      gap={'small'}
      alignItems='center'
      wrap>
      {content}
    </List>
 */
