'use client';

import { OpenProvider } from '@/components/Util/ToggleProvider';
import style from './style.module.css';
import { useToggle } from 'kotilogi-app/hooks/useToggle';
import { createContext, useContext, useEffect, useRef } from 'react';
import { CallbackOnClickProvider } from '@/components/Util/CallbackOnClickProvider';

type MobileMenuContextProps = {
    open: boolean;
    toggleState: (state?: boolean) => void,
}

const MobileMenuContext = createContext<MobileMenuContextProps | null>(null);

function MenuButton(){
    const {open, toggleState} = useMobileMenuContext();

    //const toggle = () => console.log('Toggling...');

    return (
        <OpenProvider open={open} openClassName={style.open}>
            <div className={style.button} onClick={() => toggleState()}>
                <div className={style.line}></div>
                <div className={style.line}></div>
                <div className={style.line}></div>
            </div>
        </OpenProvider>
    );
}

function MenuBody({children}){
    const {open, toggleState} = useMobileMenuContext();

    const bodyClassName = [
        style.body,
        'z-70',
    ];

    return (
        <OpenProvider open={open} openClassName={style.open}>
            <div className={bodyClassName.join(' ')}>
                <CallbackOnClickProvider callback={() => toggleState(false)}>
                    {children}
                </CallbackOnClickProvider>
            </div>
        </OpenProvider>
    );
}

export function MobileMenu({children}){
    const {toggled: open, toggleState} = useToggle(false);

    return ( 
        <MobileMenuContext.Provider value={{open, toggleState}}>
            <MenuButton/>
            <MenuBody>
                {children}
            </MenuBody>
        </MobileMenuContext.Provider>
    );
} 

function useMobileMenuContext(){
    const ctx = useContext(MobileMenuContext);
    if(!ctx) throw new Error('useMobileMenuContext must be used within the scope of a MobileMenuContext!');
    return ctx;
}