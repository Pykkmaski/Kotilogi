declare namespace GalleryWithDelete{
    declare type DeleteModalOptions = {
        headerText: string,
        bodyText: string,
    }

    declare type Props = GalleryBase.Props & {
        deleteButtonText: string,
        deleteModalOptions: DeleteModalOptions,
        
    }

    declare type DeleteButtonProps = {
        deleteModalOptions: DeleteModalOptions,
    }
}