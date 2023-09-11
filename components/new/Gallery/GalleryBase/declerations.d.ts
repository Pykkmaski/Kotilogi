declare namespace GalleryBase{
    enum ContentType{
        PROPERTY = 0x1,
        EVENT = 0x2,
        FILE = 0x4,
        IMAGE = 0x8,
    }
    
    type HasData = {
        data: (Kotilogi.PropertyType | Kotilogi.EventType | Kotilogi.PropertyFileType | Kotilogi.EventFileType)[],
    }

    type ModalOptions = {
        headerText: string,
        bodyContent: JSX.Element,/**A fragment of elements to display inside the add modal */
    }

    type Props = HasData & {
        contentType: ContentType,
        title: string,
        subTitle: string,
        headerButtons: JSX.Element[], /**Additional buttons to be included alongside the shared add button */
        addModalOptions: ModalOptions,
    }
    
    type CardProps = {
        item: any,
        key: string,
        destination: string,
        imageUrl: string | null,
    }
    
    type ContextValue = {
        state: State,
        contentType: ContentType,
        onInputChangeHandler: (e) => void,
        dispatch: any,
    }

    type State = HasData & {
        selectedItemIds: string[],
        showAddModal: boolean,
        isLoading: boolean,
    }
    
    type ActionType = 'toggle_add_modal' | 'select_id' | 'add_data' | 'toggle_loading' | 'set_data' | 'reset_selected';
    
    type Action = {
        type: ActionType,
        value: any,
    }

    
}