'use client';

import { useToggle } from "kotilogi-app/hooks/useToggle";
import React, { ReactElement, useContext, useRef } from "react";
import { createContext } from "react";

const VisibilityContext = createContext<any>(null);

export function VisibilityProvider({children}: React.PropsWithChildren){
    const {toggled: visible, toggleState} = useToggle(false);

    return (
        <VisibilityContext.Provider value={{visible, toggleState}}>
            {children}
        </VisibilityContext.Provider>
    );
}

function Trigger({children}: React.PropsWithChildren){
    const {toggleState} = useVisibilityProviderContext();

    return React.Children.map(children, (child: React.ReactElement) => React.cloneElement(child, {
        ...child.props,
        onClick: () => {
            if(child.props.onClick){
                child.props.onClick();
            }

            toggleState();
        }
    }));
}

VisibilityProvider.Trigger = Trigger;

function Target({children}: React.PropsWithChildren & {hidesOnBlur?: boolean}){
    const {visible} = useVisibilityProviderContext();

    return React.Children.map(children, (child: ReactElement) => React.cloneElement(child, {
        ...child.props,
        hidden: !visible,
    }));
}

VisibilityProvider.Target = Target;

function useVisibilityProviderContext(){
    const context = useContext(VisibilityContext);
    if(!context) throw new Error('useVisibilityContextProvider must be used within the scope of a VisibilityContext!');
    return context;
}