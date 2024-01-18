'use client';

import { useToggle } from "kotilogi-app/hooks/useToggle";
import React, { useContext, useRef } from "react";
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

    return (
        React.Children.toArray(children).map((child: React.ReactElement<React.ComponentProps<'button'>>) => {
            return React.cloneElement(child, {
                ...child.props,
                onClick: (e) => {
                    child.props.onClick && child.props.onClick(e);
                    toggleState();
                },
            })
        })
    );
}

VisibilityProvider.Trigger = Trigger;

function Target({children}: React.PropsWithChildren & {hidesOnBlur?: boolean}){
    const {visible} = useVisibilityProviderContext();
    const targetRef = useRef<HTMLDivElement | null>(null);

    return (
        React.Children.toArray(children).map((child: React.ReactElement<React.ComponentProps<'div'>>) => {
            return React.cloneElement(child, {
                ...child.props,
                ref: targetRef,
                hidden: !visible,
            })
        })
    );
}

VisibilityProvider.Target = Target;

function useVisibilityProviderContext(){
    const context = useContext(VisibilityContext);
    if(!context) throw new Error('useVisibilityContextProvider must be used within the scope of a VisibilityContext!');
    return context;
}