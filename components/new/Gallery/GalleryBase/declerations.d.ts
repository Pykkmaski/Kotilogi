declare namespace GalleryBase{
    type ContentType = 'property' | 'property_file' | 'property_image' | 'event' | 'event_file' | 'event_image';
    
    declare type HasData = {
        data: (Kotilogi.PropertyType | Kotilogi.EventType | Kotilogi.PropertyFileType | Kotilogi.EventFileType)[],
    }

    declare type ModalOptions = {
        headerText: string,
        bodyContent?: JSX.Element,/**A fragment of elements to display inside the add modal */
        callback?: () => void | Promise<void>,
    }

    declare type Props = {
        title: string,
        subTitle: string,

        /**
         * Additional buttons to include with the default add button common to all galleries.
         */
        headerButtons: JSX.Element[], 
        addModalOptions: ModalOptions,
        contentType: ContentType,

        /**
         * Error component to display when there is no data.
         */
        error: JSX.Element,

        /**
         * Name of the database table containing the data to be displayed.
         */
        dbTableName: Kotilogi.Table,

        /**
         * Reference id to parent content, eg. The property id of an event.
         */
        refId: Kotilogi.IdType,

        /**
         * Entries going in the action selector.
         */
        selectorEntries: JSX.Element[]
    }
    
    declare type CardProps = {
        item: any,
        key: string,
        destination: string,
    }
    
    declare type ContextValue = {
        state: State,
        contentType: ContentType,
        dbTableName: Kotilogi.Table,
        refId: Kotilogi.IdType,
        dispatch: any,
    }

    declare type State = HasData & {
        selectedItemIds: string[],
        showAddModal: boolean,
        isLoading: boolean,
    }
    
    declare type ActionType = 'toggle_add_modal' | 'select_id' | 'add_data' | 'toggle_loading' | 'set_data' | 'reset_selected' | 'select_all';
    
    declare type Action = {
        type: ActionType,
        value: any,
    }
}
