declare namespace GalleryWithDelete{
    declare type DeleteModalOptions = {
        headerText: string,
        bodyText: string,
    }

    declare type Props = GalleryBase.Props & {
        deleteModalOptions: GalleryBase.ModalOptions,
        contentType: GalleryBase.ContentType,
        
    }

    declare type DeleteButtonProps = {
        deleteModalOptions: GalleryBase.ModalOptions,
    }
}