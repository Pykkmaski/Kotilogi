import { PassProps } from '@/components/Util/PassProps';
import { ReactNode, useId, useMemo } from 'react';

export function useMapArray<T>(data: T[], renderMethod: (item: T) => ReactNode, props?: any) {
  const mapId = useId();
  const elements = useMemo(() => {
    return data.map((item, index) => {
      const element = renderMethod(item);
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