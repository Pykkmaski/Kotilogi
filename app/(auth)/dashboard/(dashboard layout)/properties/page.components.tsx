'use client';

import PrimaryButton from 'kotilogi-app/components/Button/PrimaryButton';
import style from './page.module.scss';
import SecondaryButton from 'kotilogi-app/components/Button/SecondaryButton';
import { deleteData } from 'kotilogi-app/actions/data/deleteData.old';
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
import { useDashboardContext } from '../DashboardContextProvider';
import {Header as HeaderComponent} from '@/components/Header/Header';
import { DeleteModal } from 'kotilogi-app/components/Modals/DeleteModal';
import { AddPropertyModal } from 'kotilogi-app/components/Modals/AddModal';
import { DataProvider } from 'kotilogi-app/components/Experimental/DataProvider/DataProvider';
import { PropertyListItem } from 'kotilogi-app/components/ListItem/ListItem';

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

export function Header(){
    const {state, dispatch} = usePageWithDataContext();
    const {user} = useDashboardContext();

    const AddModalComponent = (props: ModalProps) => (
        <AddPropertyModal refId={user.email} {...props}/>
    );

    return (
        <>
            <HeaderComponent>
                <h3>Talot</h3>
                <Group direction="horizontal" gap="0.5rem">
                    <ControlsWithAddAndDelete
                        id="property-controls"
                        AddModalComponent={AddModalComponent}

                        DeleteModalComponent={(props) => <DeleteModal<Kotilogi.PropertyType> 
                            {...props} 
                            targetsToDelete={state.selectedItems as Kotilogi.PropertyType[]}
                            deleteMethod={() => {
                                return new Promise<void>(async (resolve, reject) => {
                                    try{
                                        for(const prop of state.selectedItems as Kotilogi.PropertyType[]){
                                            await deleteProperty(prop.id);
                                        }
                                        resolve();
                                    }
                                    catch(err){
                                        reject(err);
                                    }
                                });
                            }}
                            resetSelectedTargets={() => {
                                dispatch({
                                    type: 'reset_selected',
                                    value: null,
                                });
                            }}
                            />}
                        deleteDisabled={!state.selectedItems.length}/>
                </Group>
            </HeaderComponent>
        </>
    );
}

export function Content({properties}){
    return (
        <main>
            <DataProvider initialData={properties}>
                <DataProvider.List display="list" itemComponent={PropertyListItem}/>
            </DataProvider>
        </main>
    );
}