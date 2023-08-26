"use client";
import styles from './gallery.module.scss';
import ItemCard, { ItemType } from '../Cards/ItemCard';
import Modal from '../Modals/Modal';
import { useState } from 'react';
import Form from '../Form';
import GalleryProvider, {useGallery} from 'kotilogi-app/contexts/GalleryProvider';
import Spinner from '../Spinner/Spinner';
import Loading from 'kotilogi-app/components/Loading/Loading';

export type GalleryProps = {
    content: ItemType[],
}

export type BodyProps = {
    content: any[],
    contentType: 'property' | 'event' | 'file' | 'image',
    error: any,
}

export type ButtonType = 'add' | 'delete';

export type FormField = {
    type: string,
    label: string,
    name: string,
    sublabel?: string,
    required?: boolean,
}

export type ModalOptions = {
    headerText: string,
    fields: FormField[],
}

export type Button = {
    type: ButtonType,
    action: (e) => any,
    modalOptions?: ModalOptions,
}

export type HeaderProps = {
    title: string,
    subtitle?: string,
    buttons: Button[],
}

interface HeaderOptions{
    title: string,
    subtitle?: string,
    buttons: Button[],
}

export type ContentType = 'property' | 'event' | 'image' | 'file';
export interface GalleryOptions{
    contentType: ContentType,
    header: HeaderOptions,
    contentError: JSX.Element,
}


function Gallery({contentSrc, options, ...props}){
    const headerProps: HeaderProps = options.header;
    return (
        
            <div className={styles.container}>
                <GalleryProvider contentSrc={contentSrc} options={options}>
                    <Header 
                        title={headerProps.title}
                        subtitle={headerProps.subtitle}
                        buttons={headerProps.buttons}
                    />

                    <Body />
                </GalleryProvider>
            </div>
        
    );
}

function CreateModal({show, onHide, modalOptions, action, key}){
    const onSubmitHandler = (e) => {
        e.preventDefault();
        action(e);
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} key={key}>
            <Modal.Header>{modalOptions.headerText}</Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    {
                        modalOptions.fields.map((field: FormField, index: number) => {
                            return(
                                <Form.Group>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    {
                                        field.type !== 'textarea' ? 
                                        <input name={field.name} type={field.type} required={field.required}></input>
                                        :
                                        <textarea name={field.name} required={field.required}></textarea>
                                    }
                                    
                                    <Form.SubLabel>{field.sublabel}</Form.SubLabel>
                                </Form.Group>
                            )
                        })
                    }
                    <Form.ButtonGroup>
                        <button type="button" className="secondary" onClick={() => onHide()}>Peruuta</button>
                        <button type="submit" className="primary">Lähetä</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    )     
}

export function Header(props: HeaderProps){
    const {data, options, isLoading} = useGallery();
    const headerOptions: HeaderOptions = options.header;

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if(isLoading) return null;

    //Infer what modals to include based on the provided buttons
    const modals: JSX.Element[] = [];
    const buttonsWithModals = headerOptions.buttons.filter((button: Button) => button.modalOptions);
    buttonsWithModals.forEach((button: Button, index: number) => {
        const modalOptions = button.modalOptions;
        if(!modalOptions) throw new Error('Gallery: Must specify modalOptions when a button is to include a modal!');

        if(button.type === 'add'){
            return modals.push(
                <CreateModal 
                    key={`gallery-modal-${index}`}
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)} 
                    modalOptions={modalOptions} 
                    action={button.action}
                />
            );
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
                                        onClick={button.modalOptions ? () => setShowAddModal(true) : button.action}
                                    >
                                        Lisää Uusi
                                    </button>)
                            }
                            
                            if(button.type === 'delete'){
                                return (
                                    <button 
                                        type="button" 
                                        className="secondary" 
                                        disabled={data.length === 0} 
                                        onClick={button.modalOptions ? () => setShowDeleteModal(true) : button.action}
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

export function Body(){
    const {data, contentType, isLoading, error, options} = useGallery();

    const getContentItem = (entry: any): ItemType => {
        const item: ItemType = {
            title: contentType === 'property' ? entry.address : contentType === 'event' ? entry.name : 'none',
            description: entry.description,
            id: entry.id,
        }

        return item;
    }

    if(isLoading) return <Loading message="Ladataan kohteita..." />
    if(error) return <h1>Kohteiden lataus epäonnistui.</h1>
    return (
        <div className={styles.galleryBody}>
            {
                data.length ? 
                data.map(entry => {
                    const item = getContentItem(entry);
                    const destinationUrl = 
                    contentType === 'property' ? '/properties/' + item.id + '/info'
                    : 
                    contentType === 'event' ? `/events/` + item.id : '/login';

                    return (
                        <ItemCard item={item} destinationUrl={destinationUrl} imageUrl={'/'}/>
                    )
                })
                :
                options.contentError
            }
        </div>
    );
}

export default Gallery;