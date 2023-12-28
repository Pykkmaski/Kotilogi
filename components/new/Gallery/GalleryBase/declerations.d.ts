import { ModalProps } from "kotilogi-app/components/Modals/Modal";

declare namespace GalleryBase{
    /**
     * The type of content contained by the gallery.
     */
    type ContentType = 'image' | 'file' | 'object' | 'usage';
    
    declare type HasData = {
        data: (Kotilogi.PropertyType | Kotilogi.EventType | Kotilogi.PropertyFileType | Kotilogi.EventFileType)[],
    }

    declare type Props = {

    }
    
    declare type CardProps = {
        item: any,
        destination: string,
    }
    
    declare type State = HasData & {
        selectedItems: any[],
        showEditModal: boolean,
        isLoading: boolean,
        currentPage: number,
        error: boolean,
        search: {
            what: string,
            column: string | null,
        },
    }
    
    
    
    declare type Action = {
        type: ActionType,
        value: any,
    }
}
