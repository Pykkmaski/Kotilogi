import { useContext, createContext } from 'react';
import { State } from './reducers/resetFormReducer';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';

const ResetFormContext = createContext<{
  state: State;
  dispatch: any;
  next: () => void;
  previous: () => void;
  reset: () => void;
} | null>(null);

type ResetFormProviderProps = {
  state: State;
  dispatch: any;
  next: () => void;
  previous: () => void;
  reset: () => void;
} & {
  children: React.ReactNode;
};

export default function ResetFormProvider({
  children,
  state,
  dispatch,
  next,
  previous,
  reset,
}: ResetFormProviderProps) {
  return (
    <ResetFormContext.Provider value={{ state, dispatch, next, previous, reset }}>
      {children}
    </ResetFormContext.Provider>
  );
}

export const useResetFormProvider = createUseContextHook('ResetFormContext', ResetFormContext);
