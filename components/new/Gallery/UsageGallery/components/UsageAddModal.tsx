import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useGalleryContext } from "../../GalleryBase/Gallery";
import AddModal from "../AddModal";

export function UsageAddModal(props: ModalProps){
    const {props: {query: {type}}} = useGalleryContext();
    if(!type) throw new Error('Usage add modal cannot be rendered because usage type is undefined!');

    return (
        <AddModal 
            {...props}
            type={type}
        />
    );
}