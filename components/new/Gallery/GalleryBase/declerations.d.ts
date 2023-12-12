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
            item: any,
        }>,

        /**
         * The modal displayed when the global delete button of the gallery is pressed.
         */
        DeleteModal?: React.FC<ModalProps>,

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
        query: {refId: Kotilogi.IdType, mimeType?: Kotilogi.MimeType, type?: 'heat' | 'water' | 'electric'},

        /**
         * For development purposes, Explicitly state this gallery is unsupported.
         */

        unsupported?: boolean,

        /**
         * The style to display the gallery in: Grid or List. 
         * Ignored when the content type is set to file or image.
         */

        displayStyle?: 'grid' | 'list';

        /**
         * The element representing the individual data contained by the gallery.
         */

        ItemComponent: React.FC<{
            item: any,
        }>,

        /**
         * The component to display when there is no content.
         */
        errorComponent: JSX.Element,
    }
    
    declare type CardProps = {
        item: any,
        destination: string,
    }
    
    declare type ContextValue = {
        state: State,
        props: Props & {children?: React.ReactNode},
        dispatch: React.Dispatch,
        reloadItem: (id: Kotilogi.IdType) => void,
    }

    declare type State = HasData & {
        selectedItems: any[],
        itemInFocus: any,
        showAddModal: boolean,
        showEditModal: boolean,
        showDeleteModal: boolean,
        isLoading: boolean,
        currentPage: number,
        viewType: 'card' | 'list',
        error: boolean,
        searchString: string,
    }
    
    declare type ActionType = 
        'toggle_add_modal' | 
        'toggle_delete_modal' |
        'toggle_edit_modal' |
        'select_item' | 
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
