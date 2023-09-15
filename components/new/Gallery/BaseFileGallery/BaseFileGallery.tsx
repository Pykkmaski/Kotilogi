import SelectAllButton from "../GalleryBase/Components/SelectAllButton";
import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import AddForm from "./Components/AddForm";
import getFileTypeByContentType from "../Util/getFileTypeByContentType";
import DeselectAllButton from "../GalleryBase/Components/DeselectAllButton";

type BaseFileGalleryProps = GalleryBase.Props & {
    deleteModalOptions: GalleryBase.ModalOptions,
    contentType: 'property_image' | 'property_file' | 'event_image' | 'event_file',
}

export default function BaseFileGallery(props: BaseFileGalleryProps){

    const fileType = getFileTypeByContentType(props.contentType);
    if(!fileType) throw new Error(`BaseFileGallery: Received unsupported content type (${props.contentType})! Cannot determine file type!`);

    const addModalOptions: GalleryBase.ModalOptions = {
        ...props.addModalOptions,
        bodyContent: <AddForm />
    }

    const headerButtons = [
        ...props.headerButtons,
        <SelectAllButton/>,
        <DeselectAllButton/>
    ]

    return (
        <GalleryWithDelete
            {...props}
            addModalOptions={addModalOptions}
            headerButtons={headerButtons}
        />
    );
}