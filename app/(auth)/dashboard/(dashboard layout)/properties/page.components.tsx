'use client';

import PrimaryButton from 'kotilogi-app/components/Button/PrimaryButton';
import style from './page.module.scss';
import SecondaryButton from 'kotilogi-app/components/Button/SecondaryButton';
import { deleteData } from 'kotilogi-app/actions/data/deleteData';
import { deleteProperty } from 'kotilogi-app/actions/property/deleteProperty';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Modal, { ModalProps } from 'kotilogi-app/components/Modals/Modal';
import { Input, Select, Textarea } from 'kotilogi-app/components/Input/Input';
import Form from 'kotilogi-app/components/Form/Form';
import { Label } from 'kotilogi-app/components/Label/Label';
import { useChangeInput } from 'kotilogi-app/hooks/useChangeInput';
import { addProperty } from 'kotilogi-app/actions/property/addProperty';
import { useSession } from 'next-auth/react';
import { buildingTypes } from 'kotilogi-app/constants';
import Link from 'next/link';
import { ActionType, StateType } from './page.reducer';
import { usePageWithDataContext } from 'kotilogi-app/components/PageWithData/PageWithData';
import toast from 'react-hot-toast';
import { Group } from 'kotilogi-app/components/Group/Group';
import { ControlsWithAddAndDelete } from 'kotilogi-app/components/HeaderControls/ControlsWithAddAndDelete';
import { AddPropertyModal } from 'kotilogi-app/components/Modals/AddModal';
import { useDashboardContext } from '../DashboardContextProvider';
import {Header as HeaderComponent} from '@/components/Header/Header';

type PropertyPageContextProps = React.PropsWithChildren & {
    ownerId: string,
}

export const PropertyPageContext = createContext<PropertyPageContextProps | null>(null);

export function PropertyPageContextProvider({children, ...props}: PropertyPageContextProps){
    return (
        <PropertyPageContext.Provider value={props}>
            {children}
        </PropertyPageContext.Provider>
    );
}

function usePropertyPageContext(){
    const context = useContext(PropertyPageContext);
    if(!context) throw new Error('usePropertyPageContext must be used within the scope of a PropertyGalleryContext!');
    return context;
}

export function Header(){
    const {state} = usePageWithDataContext();
    const {user} = useDashboardContext();

    return (
        <>
            <HeaderComponent>
                <h3>Talot</h3>
                <Group direction="horizontal" gap="0.5rem">
                    <ControlsWithAddAndDelete
                        id="property-controls"
                        AddModalComponent={(props) => <AddPropertyModal {...props} ownerId={user.email}/>}
                        deleteDisabled={!state.selectedItems.length}/>
                </Group>
                
            </HeaderComponent>
                
        </>
    );
}

function AddButton(props: React.ComponentProps<'div'>){
    return (
        <div className={style.addButton} {...props}>
            <img src="/icons/plus.png"/>
        </div>
    );
}

function DeleteButton(){
    const {state: {selectedItems}} = usePageWithDataContext();

    return (
        selectedItems.length ? 
        <div className={style.deleteButton}>
            <img src="/icons/bin.png"/>
        </div>
        :
        null
    );
}

export function NavBar(){
    return (
        <nav className={style.navbar}>
            <Link href="/properties">Talot</Link>
            <Link href="/settings">Asetukset</Link>
        </nav>
    )
}