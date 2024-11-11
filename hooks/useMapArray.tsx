import { PassProps } from '@/components/Util/PassProps';
import { ReactNode, useId, useMemo } from 'react';

/**Renders the provided data into as elements according to the render method. Automatically adds a key to each element created. */
export function useMapArray<T>(
  data: T[],
  renderMethod: (item: T, index: number) => ReactNode,
  props?: any
) {
  const mapId = useId();
  const elements = useMemo(() => {
    return data.map((item, index) => {
      const element = renderMethod(item, index);
      return (
        <PassProps
          {...props}
          key={`${mapId}-${index}`}>
          {element}
        </PassProps>
      );
    });
  }, [data, props, renderMethod]);

  return elements;
}
