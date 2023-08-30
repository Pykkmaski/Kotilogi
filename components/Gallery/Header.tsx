import { useGallery } from "kotilogi-app/contexts/GalleryProvider";
import { useReducer } from "react";
import { HeaderProps, HeaderOptions, Button } from "./Types";
import { Action, reducer } from "./headerReducer";
import ModalElement from "./ModalElement";
import styles from './gallery.module.scss';

export function Header(props: HeaderProps){
    const {
        options, 
        deleteSelected, 
        selectedItems, 
        addData
    } = useGallery();
        
    const headerOptions: HeaderOptions = options.header;

    const [state, dispatch] = useReducer(reducer, {
        showAddModal: false,
        showDeleteModal: false,
    });

    //Create modals
    const buttonsWithModals = headerOptions.buttons.filter((button: Button) => button.modalOptions);
    const modals: JSX.Element[] = [];
    buttonsWithModals.forEach((button: Button, index: number) => {
        if(button.type === 'add'){
            const modalElement = <ModalElement
                modalOptions = {button.modalOptions}
                action = {(data) => addData(data)}
                show = {state.showAddModal}

                onHide = {() => dispatch({
                    type: 'toggle_add_modal',
                    setting: false
                } as Action)}

                key = {index}
            />

            return modals.push(modalElement);
        }

        if(button.type === 'delete'){
            const modalElement = <ModalElement
                modalOptions = {button.modalOptions}
                action = { () => deleteSelected() }
                show = {state.showDeleteModal}

                onHide = {() => dispatch({
                    type: 'toggle_delete_modal',
                    setting: false
                } as Action)}

                key = {index}
            />

            return modals.push(modalElement);
        }
    });

    return (
        <>
        {modals}
        <div className={styles.galleryHeader}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{props.title}</h1>
                <small className={styles.subtitle}>{props.subtitle}</small>
            </div>

            <div className={styles.buttonsContainer}>
                {
                    props.buttons.map((button: Button) => {

                        if(button.type === 'add'){
                            return (
                                <button 
                                    type="button" 
                                    className="primary add" 
                                    onClick={() => dispatch({
                                        type: 'toggle_add_modal',
                                        setting: true,
                                    })}
                                >
                                    Lisää Uusi
                                </button>
                            )
                        }
                        
                        if(button.type === 'delete'){
                            return (
                                <button 
                                    type="button" 
                                    className="secondary" 
                                    disabled={selectedItems.length === 0} 
                                    onClick={() => dispatch({
                                        type: 'toggle_delete_modal',
                                        setting: true,
                                    })}
                                >
                                    Poista
                                </button>
                            )
                        }
                        
                        return null;
                    })
                }
            </div>
        </div>
        </>
    );
}
