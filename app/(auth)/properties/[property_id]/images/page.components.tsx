'use client';
import {Header as HeaderComponent} from '@/components/Header/Header';
import { Group } from 'kotilogi-app/components/Group/Group';
import { ControlsWithAddAndDelete } from 'kotilogi-app/components/HeaderControls/ControlsWithAddAndDelete';
import { Heading } from 'kotilogi-app/components/Heading/Heading';
import { AddFilesModal } from 'kotilogi-app/components/Modals/AddFilesModal';
import { AddImagesModal, AddPropertyFilesModal } from 'kotilogi-app/components/Modals/AddModal';
import { usePageWithDataContext } from 'kotilogi-app/components/PageWithData/PageWithData';
import { usePropertyContext } from '../_util/PropertyContextProvider';
import { DeleteModal } from 'kotilogi-app/components/Modals/DeleteModal';
import { deleteEventFiles } from 'kotilogi-app/actions/propertyEvent/deleteEventFiles';
import { deletePropertyFiles } from 'kotilogi-app/actions/property/deletePropertyFiles';
import { upload } from 'kotilogi-app/actions/file/upload';

export function Controls(){
    const {property} = usePropertyContext();
    const {state, dispatch} = usePageWithDataContext();

    const DeleteModalComponent = (props) => <DeleteModal {...props} targetsToDelete={state.selectedItems} deleteMethod={
        () => new Promise<void>(async (resolve, reject) => {
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
                id="property-images-controls"
                AddModalComponent={(props) => <AddImagesModal title="Lisää Kuvia" tableName="propertyFiles" inputDescription="Lisää talolle kuvia." submitMethod={upload}  refId={property.id} {...props}/>}
                DeleteModalComponent={DeleteModalComponent}
                deleteDisabled={!state.selectedItems.length}
            />
        </Group>
    )
}