'use client';

import { deleteProperty } from 'kotilogi-app/actions/property/deleteProperty';
import { createContext } from 'react';
import { ModalProps } from 'kotilogi-app/components/Modals/Modal';
import { usePageWithDataContext } from 'kotilogi-app/components/PageWithData/PageWithData';
import { Group } from 'kotilogi-app/components/Group/Group';
import { ControlsWithAddAndDelete } from 'kotilogi-app/components/HeaderControls/ControlsWithAddAndDelete';
import { useDashboardContext } from '../DashboardContextProvider';
import {Header as HeaderComponent} from '@/components/Header/Header';
import { DeleteModal } from 'kotilogi-app/components/Modals/DeleteModal';
import { AddPropertyModal } from 'kotilogi-app/components/Modals/AddModal';
import { PropertyListItem } from 'kotilogi-app/components/ListItem/ListItem';
import { Gallery } from 'kotilogi-app/components/new/Gallery/GalleryBase/Gallery';
import {Error} from 'kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/Error';

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

export function Content({properties, user}){
    return (
        <main>
            <Gallery<Kotilogi.PropertyType> data={properties}>
                <Gallery.Header 
                    title="Talot" 
                    AddModal={(props) => <AddPropertyModal refId={user.email} {...props}/>}
                    DeleteModal={(props: ModalProps) => {
                        return <Gallery.DeleteModal {...props} deleteMethod={(id: string) => deleteProperty(id)}/>
                    }}/>
                <Gallery.Body displayStyle='vertical' itemComponent={PropertyListItem} errorElement={
                    <Error title="Ei Taloja" message="Et ole vielä lisännyt taloja." icon="/icons/house.png"/>
                }/>
            </Gallery>
        </main>
    );
}