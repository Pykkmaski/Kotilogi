import BaseFileGallery from "../BaseFileGallery";

type ImageGalleryProps = {
    title: string,
    subTitle: string,
    contentType: 'property_image' | 'event_image',
    data: any,
    addModalOptions: GalleryBase.ModalOptions,
}


export default function ImageGallery(props: ImageGalleryProps){
    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista valitut kuvat',
        bodyContent: <span>Halutako varmasti poistaa valitsemasi kuvat?</span>,
    }

    return (
        <BaseFileGallery
            title={props.title}
            subTitle={props.subTitle}
            data={props.data}
            headerButtons={[]}
            addModalOptions={props.addModalOptions}
            deleteModalOptions={deleteModalOptions}
            contentType={props.contentType}
        />
    );
}