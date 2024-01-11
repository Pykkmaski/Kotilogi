'use client';

import { Group } from "kotilogi-app/components/Group/Group";
import { ControlsWithAddAndDelete } from "kotilogi-app/components/HeaderControls/ControlsWithAddAndDelete";
import { AddPropertyFilesModal } from "kotilogi-app/components/Modals/AddModal";
import { usePageWithDataContext } from "kotilogi-app/components/PageWithData/PageWithData";
import { usePropertyContext } from "../_util/PropertyContextProvider";

export function Controls(){
    const {state} = usePageWithDataContext();
    const {property} = usePropertyContext();
    
    return (
        <Group direction="horizontal">
            <ControlsWithAddAndDelete
                id="property-files-controls"
                AddModalComponent={(props) => <AddPropertyFilesModal {...props} propertyId={property.id}/>}
                deleteDisabled={!state.selectedItems.length}
            />  
        </Group>
    )
};