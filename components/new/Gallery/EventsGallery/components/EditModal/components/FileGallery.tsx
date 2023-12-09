import { ModalProps } from "kotilogi-app/components/Modals/Modal"
import FileContainer from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Body/Components/ImageItemComponent/ImageItemComponent"
import FileItemComponent from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Body/Components/FileItemComponent/FileItemComponent"
import GalleryBase from "kotilogi-app/components/new/Gallery/GalleryBase/GalleryBase"
import AddFilesModal from "kotilogi-app/components/new/Gallery/Modals/AddFilesModal"
import FileIcon from '@/assets/copy_filled.png';

function AddPdfsModal(props: ModalProps & {item: any}): JSX.Element{
    return (
        <AddFilesModal
            show={props.show}
            onHide={props.onHide}
            title="Lataa Tiedostoja"
            fileType="application/pdf"
            id="add-event-files-modal"
            item={props.item}
        />
    )
}

export default function FileGallery(props: {
    item: any,
}){
    return (
        <GalleryBase
            title="Tiedostot"
            query={{
                refId: props.item.id,
                mimeType: 'application/pdf',
            }}
            tableName="eventFiles"
            contentType="file"
            displayStyle="list"
            AddModal={(HOCProps: ModalProps & {item: any}) => {
                return (
                    <AddPdfsModal
                        {...HOCProps}
                        item={props.item}
                    />
                )
            }}
            ItemComponent={(hocprops) => {
                return (
                    <FileItemComponent
                        {...hocprops}
                        imageSrc={FileIcon}
                        destination={`/api/files/${hocprops.item.id}?tableName=eventFiles`}
                    />
                )
            }}
        />
    )
}