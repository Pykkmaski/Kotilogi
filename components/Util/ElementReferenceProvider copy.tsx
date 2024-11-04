import { useChildCount } from '@/hooks/useChildCount';
import { createContextWithHook } from '@/utils/createContextWithHook';
import { useCallback, useRef, useState } from 'react';
import { PassProps } from './PassProps';

const [ElementReferenceProviderContext, useElementReferenceProvider] = createContextWithHook<{
  reference: HTMLElement | null;
  updateReference: (e: any) => void;
}>('ElementReferenceProviderContext');

export function ElementReferenceProvider({ children, ...props }: React.PropsWithChildren) {
  const [reference, setReference] = useState<HTMLElement | null>(null);
  const updateReference = useCallback(
    (e: any) => {
      setReference(e.currentTarget);
    },
    [reference, setReference]
  );

  return (
    <ElementReferenceProviderContext.Provider value={{ reference, updateReference }}>
      {children}
    </ElementReferenceProviderContext.Provider>
  );
}

type ElementProps = React.PropsWithChildren & { [x: string]: any };
ElementReferenceProvider.Element = function ({ children, ...props }: ElementProps) {
  useChildCount(children, 1, 'ElementReferenceProvider.Element expects exactly one child!');
  const { updateReference } = useElementReferenceProvider();
  return (
    <PassProps
      {...props}
      onClick={(e: any) => {
        props.onClick && props.onClick(e);
        updateReference(e);
      }}>
      {children}
    </PassProps>
  );
};

type TargetProps = React.PropsWithChildren & { [x: string]: any };

ElementReferenceProvider.Target = function ({ children, ...props }: TargetProps) {
  useChildCount(children, 1, 'ElementReferenceProvider.Target expects exactly one child!');
  const { reference } = useElementReferenceProvider();
  return (
    <PassProps
      {...props}
      reference={reference}>
      {children}
    </PassProps>
  );
};
