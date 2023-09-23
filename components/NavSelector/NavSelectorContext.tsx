import {createContext, useContext} from 'react';

type ContextValue = {
    setSelectedPage: any,
    open: boolean,
}

const NavSelectorContext = createContext<ContextValue | null>(null);

type Props = {
    value: ContextValue,
    children: React.ReactNode,
}

export default function NavSelectorProvider(props: Props){
    return (
        <NavSelectorContext.Provider value={props.value}>
            {props.children}
        </NavSelectorContext.Provider>
    );
}

export function useNavSelectorContext(){
    const context = useContext(NavSelectorContext);
    if(!context) throw new Error('NavSelectorContext cannot be null!');
    return context;
}