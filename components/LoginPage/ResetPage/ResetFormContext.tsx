import { useContext, createContext } from "react";
import { State } from "./resetFormReducer";

type ResetFormContextType = {
    state: State,
    dispatch: any,
    next: () => void,
    previous: () => void,
    reset: () => void,
}

const ResetFormContext = createContext<ResetFormContextType | null>(null);

type ResetFormProviderProps = ResetFormContextType & {
    children: React.ReactNode,
}

export default function ResetFormProvider(props: ResetFormProviderProps){
    var contextValue = {
        ...props,
    };
    
    delete contextValue.children;

    return (
        <ResetFormContext.Provider value={contextValue}>
            {props.children}
        </ResetFormContext.Provider>
    )
}

export function useResetFormProvider(){
    const context = useContext(ResetFormContext);
    if(!context) throw new Error('useResetFormProvider: context cannot be null!');
    return context;
}