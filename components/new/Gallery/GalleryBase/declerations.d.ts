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
        headerButtons: JSX.Element[], /**Additional buttons to be included alongside the shared add button */
        addModalOptions: ModalOptions,
        contentType: ContentType,
        error: JSX.Element /**Error component to be displayed if data is empty */
        dbTableName: Kotilogi.Table,
        refId: Kotilogi.IdType,
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
