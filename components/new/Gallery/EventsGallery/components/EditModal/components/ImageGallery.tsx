import { ModalProps } from "kotilogi-app/components/Modals/Modal"
import FileContainer from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Body/Components/ImageItemComponent/ImageItemComponent"
import GalleryBase from "kotilogi-app/components/new/Gallery/GalleryBase/GalleryBase"
import AddFilesModal from "kotilogi-app/components/new/Gallery/Modals/AddFilesModal"

function AddImagesModal(props: ModalProps & {item: any}): JSX.Element{
    return (
        <AddFilesModal 
            show={props.show} 
            onHide={props.onHide}
            title="Lisää Kuvia"
            fileType="image/jpeg"
            id="add-event-images-modal"
            item={props.item}
        />
    )
}

function ItemComponent(props: {
    item: any,
}){
    return (
        <FileContainer
            item={props.item}
        />
    )
}

export default function ImageGallery(props: {
    item: any,
}){
    return (
        <GalleryBase 
            title="Kuvat"
            query={{
                refId: props.item.id,
                mimeType: 'image/jpeg',
            }}
            tableName="eventFiles"
            contentType="image"
            AddModal={(HOCProps: ModalProps) => {
                return (
                    <AddImagesModal
                        {...HOCProps}
                        item={props.item}
                    />
                )  
            }}
            ItemComponent={ItemComponent}
        />
    )
}