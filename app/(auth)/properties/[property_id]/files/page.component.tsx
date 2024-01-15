'use client';

import { Group } from "kotilogi-app/components/Group/Group";
import { ControlsWithAddAndDelete } from "kotilogi-app/components/HeaderControls/ControlsWithAddAndDelete";
import { AddPropertyFilesModal } from "kotilogi-app/components/Modals/AddModal";
import { usePageWithDataContext } from "kotilogi-app/components/PageWithData/PageWithData";
import { usePropertyContext } from "../_util/PropertyContextProvider";
import { DeleteModal } from "kotilogi-app/components/Modals/DeleteModal";
import { deletePropertyFiles } from "kotilogi-app/actions/property/deletePropertyFiles";

export function Controls(){
    const {state, dispatch} = usePageWithDataContext();
    const {property} = usePropertyContext();
    
    const DeleteModalComponent = (props) => <DeleteModal {...props} targetsToDelete={state.selectedItems} deleteMethod={
        () => new Promise(async (resolve, reject) => {
            try{
                await deletePropertyFiles(state.selectedItems as Kotilogi.FileType[]);
                dispatch({
                    type: 'reset_selected',
                    value: null,
                });
                resolve();
            }
            catch(err){
                reject(err);
            }
        })
    } resetSelectedTargets={() => {
        dispatch({
            type: 'reset_selected',
            value: null,
        });
    }}/>

    return (
        <Group direction="horizontal">
            <ControlsWithAddAndDelete
                id="property-files-controls"
                AddModalComponent={(props) => <AddPropertyFilesModal {...props} propertyId={property.id}/>}
                DeleteModalComponent={DeleteModalComponent}
                deleteDisabled={!state.selectedItems.length}
            />  
        </Group>
    )
};