declare namespace GalleryWithDelete{
    declare type DeleteModalOptions = {
        headerText: string,
        bodyText: string,
        callback?: () => void,
    }

    declare type Props = GalleryBase.Props & {
        DeleteModal?: React.FC<{
            show: boolean,
            onHide: () => void,
        }>,
    }

    declare type DeleteButtonProps = {
        deleteModalOptions: GalleryBase.ModalOptions,
    }
}