import { useToggle } from '@/hooks/useToggle';
import { createUseContextHook } from '@/utils/createUseContextHook';
import { createContext, ReactElement } from 'react';
import { PassProps } from './PassProps';
import { useChildCount } from '@/hooks/useChildCount';
import { useFirstChild } from '@/hooks/useFirstChild';

const ToggleProviderContext = createContext<{
  isToggled: boolean;
  toggleState: (state?: boolean) => void;
} | null>(null);

type ToggleProviderProps = React.PropsWithChildren & {
  initialState?: boolean | (() => boolean);
};

export function ToggleProvider({ children, initialState = false }: ToggleProviderProps) {
  const { state: isToggled, toggleState } = useToggle(
    typeof initialState === 'boolean' ? initialState : initialState()
  );

  return (
    <ToggleProviderContext.Provider value={{ isToggled, toggleState }}>
      {children}
    </ToggleProviderContext.Provider>
  );
}

type TriggerProps = React.PropsWithChildren & { [x: string]: any };

ToggleProvider.Trigger = function ({ children, ...props }: TriggerProps) {
  useChildCount(children, 1, 'ToggleProvider.Trigger expects exactly one child!');
  const { toggleState } = useToggleProviderContext();
  const child = useFirstChild(children) as ReactElement<any>;

  return (
    <PassProps
      {...props}
      onClick={(e: any) => {
        props.onClick && props.onClick(e);
        child.props.onClick && child.props.onClick(e);
        toggleState();
      }}>
      {child}
    </PassProps>
  );
};

type TargetProps = React.PropsWithChildren & { [x: string]: any };
ToggleProvider.Target = function ({ children, ...props }: TargetProps) {
  useChildCount(children, 1, 'ToggleProvider.Target expects exactly one child!');
  const { isToggled, toggleState } = useToggleProviderContext();
  const child = useFirstChild(children);

  return (
    <PassProps
      {...props}
      isToggled={isToggled}
      onToggle={state => toggleState(state)}>
      {child}
    </PassProps>
  );
};

/**
 * A specialized Target for use with Material UI menus and dialogs, that passes an onClose-prop to it's children.
 * @param param0
 * @returns
 */
ToggleProvider.MUITarget = function ({ children, ...props }: TargetProps) {
  useChildCount(children, 1, 'ToggleProvider.MUITarget expects exactly one child!');
  const { toggleState } = useToggleProviderContext();
  return (
    <ToggleProvider.Target
      {...props}
      onClose={() => toggleState(false)}>
      {children}
    </ToggleProvider.Target>
  );
};

export const useToggleProviderContext = createUseContextHook(
  'ToggleProviderContext',
  ToggleProviderContext
);
