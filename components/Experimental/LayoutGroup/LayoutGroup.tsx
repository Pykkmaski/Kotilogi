import React, { CSSProperties } from 'react';

type GroupProps = React.PropsWithChildren & {
  weights?: number[];
  direction?: 'vertical' | 'horizontal';
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
};

export function LayoutGroup({ children, weights, direction = 'vertical', ...props }: GroupProps) {
  const style: CSSProperties = {
    display: 'flex',
    flexFlow: direction === 'vertical' ? 'column' : 'row',
    gap: props.gap,
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
  };

  return (
    <div style={style}>
      {React.Children.toArray(children).map((child: React.ReactElement, index) => {
        const weight = weights && weights[index] ? weights[index] : 0;
        return <div style={{ flex: weight }}>{child}</div>;
      })}
    </div>
  );
}
