import Modal from "kotilogi-app/components/Modals/Modal"
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import serverDeleteFilesByIds from "kotilogi-app/actions/serverDeleteFilesByIds";
import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import { serverGetData } from "kotilogi-app/actions/serverGetData";
import toast from "react-hot-toast";
import Button from "kotilogi-app/components/Button/Button";

type Props = {
    show: boolean,
    toggleVisible: (state: boolean) => void,
}

export default function DeleteModal(props: Props){
    const {state, dispatch, dbTableName, refId} = useGalleryContext();
    
    async function deleteSelected(){
        try{
            dispatch({
                type: 'toggle_loading',
                value: true,
            });

            var result: boolean = false;
            const fileTables: Kotilogi.Table[] = ['propertyFiles', 'propertyImages', 'eventFiles', 'eventImages'];

            if(fileTables.includes(dbTableName)){
                result = await serverDeleteFilesByIds(state.selectedItemIds, dbTableName!);
            }
            else{
                result = await serverDeleteDataByIds(state.selectedItemIds, dbTableName!);
            }

            if(!result) throw new Error('Failed to delete data!');

            const currentData = await serverGetData(dbTableName, {refId: refId}, false);
            dispatch({
                type: 'set_data',
                value: currentData,
            });

            toast.success('Kohteiden poisto onnistui!');
            
        }
        catch(err){
            console.log(err.message);
            toast.error('Kohteiden poisto epäonnistui!');
        }
        finally{
            dispatch({type: 'reset_selected'});
            dispatch({
                type: 'toggle_loading',
                value: false,
            });
            props.toggleVisible(false);
        }
    }

    return (
        <Modal show={props.show} onHide={() => props.toggleVisible(false)} id="gallery-delete-modal">
            <Modal.Header>Poista Valinnat</Modal.Header>
            <Modal.Body>
                Haluatko varmasti poistaa valitsemasi kohteet?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    desktopText="Kyllä"
                    className="secondary"
                    onClick={deleteSelected}
                    disabled={state.isLoading}
                    loading={state.isLoading}
                />

                <Button
                    desktopText="Ei"
                    className="primary"
                    onClick={() => props.toggleVisible(false)}
                    disabled={state.isLoading}
                />
            </Modal.Footer>
        </Modal>
    )
}