import { ModalProps } from "kotilogi-app/components/Modals/Modal";

declare namespace GalleryBase{
    type ContentType = 'image' | 'file' | 'object';
    
    declare type HasData = {
        data: (Kotilogi.PropertyType | Kotilogi.EventType | Kotilogi.PropertyFileType | Kotilogi.EventFileType)[],
    }

    declare type Props = {
        /**
         * The title displayed in the header of the gallery.
         */
        title: string,

        /**
         * The modal displayed when the global add-button of the gallery is pressed.
         */
        AddModal?: React.FC<{
            show: boolean,
            onHide: () => void
        }>,

        /**
         * The modal displayed when an object-cards open-button is pressed.
         */
        EditModal?: React.FC<{
            show: boolean,
            onHide: () => void
        }>,

        /**
         * The modal displayed when the global delete button of the gallery is pressed.
         */
        DeleteModal?: React.FC<{
            show: boolean,
            onHide: () => void
        }>,

        /**
         * The type of content the gallery contains.
         */
        contentType: ContentType,

        /**
         * Name of the database table containing the data to be displayed.
         */
        tableName: Kotilogi.Table,

        /**
         * Query object passed to knex.
         */
        query: {refId: Kotilogi.IdType, mimeType?: Kotilogi.MimeType},
    }
    
    declare type CardProps = {
        item: any,
        destination: string,
    }
    
    declare type ContextValue = {
        state: State,
        props: Props,
        dispatch: React.Dispatch,
    }

    declare type State = HasData & {
        selectedItemIds: Kotilogi.IdType[],
        itemInFocus: any,
        showAddModal: boolean,
        showEditModal: boolean,
        showDeleteModal: boolean,
        isLoading: boolean,
        currentPage: number,
        viewType: 'card' | 'list',
        error: boolean,
    }
    
    declare type ActionType = 
        'toggle_add_modal' | 
        'toggle_delete_modal' |
        'toggle_edit_modal' |
        'select_id' | 
        'add_data' | 
        'delete_data' |
        'delete_items' |
        'toggle_loading' | 
        'toggle_error' |
        'set_data' | 
        'reset_selected' | 
        'select_all' | 
        'set_viewtype' |
        'show_edit_modal' |
        'hide_edit_modal' |
        'edit_item' |
        'update_item' |
        'set_page_number';
    
    declare type Action = {
        type: ActionType,
        value: any,
    }
}
