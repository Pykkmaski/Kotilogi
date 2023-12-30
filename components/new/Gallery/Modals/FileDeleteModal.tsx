import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import ItemDeleteModal from "./ItemDeleteModal";
import { useItemComponentContext } from "../GalleryBase/Components/Body/Components/ItemComponent/ItemComponent";
import { deleteFiles } from "kotilogi-app/actions/deleteData";
import toast from "react-hot-toast";

/**
 * Modal to display when deleting files.
 * @param props 
 */
export default function FileDeleteModal(props: ModalProps){

    const {item} = useItemComponentContext();

    const onDeleteSuccess = async () => {
        //Delete the files from disk.
        const error = await deleteFiles([item.fileName]);
        if(error != 0){
            toast.error('Tiedoston ' + item.fileName + ' poisto epäonnistui!');
        }
        else{
            toast.success('Tiedoston poisto onnistui!');
        }
    }

    return (
        <ItemDeleteModal {...props} callback={onDeleteSuccess}/>
    );
}