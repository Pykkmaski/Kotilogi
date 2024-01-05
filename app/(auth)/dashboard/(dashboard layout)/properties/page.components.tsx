'use client';

import PrimaryButton from 'kotilogi-app/components/Button/PrimaryButton';
import style from './page.module.scss';
import SecondaryButton from 'kotilogi-app/components/Button/SecondaryButton';
import { deleteData } from 'kotilogi-app/actions/data/deleteData';
import { deleteProperty } from 'kotilogi-app/actions/property/deleteProperty';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Modal, { ModalProps } from 'kotilogi-app/components/Modals/Modal';
import { Input } from 'kotilogi-app/components/Input/Input';
import Form from 'kotilogi-app/components/Form/Form';
import { Label } from 'kotilogi-app/components/Label/Label';
import { useChangeInput } from 'kotilogi-app/hooks/useChangeInput';
import { addProperty } from 'kotilogi-app/actions/property/addProperty';
import { useSession } from 'next-auth/react';
import { buildingTypes } from 'kotilogi-app/constants';
import Link from 'next/link';
import { ActionType, StateType } from './page.reducer';
import { usePageWithDataContext } from 'kotilogi-app/components/PageWithData/PageWithData';
import toast from 'react-hot-toast';

type PropertyPageContextProps = React.PropsWithChildren & {
    ownerId: string,
}

export const PropertyPageContext = createContext<PropertyPageContextProps | null>(null);

export function PropertyPageContextProvider({children, ...props}: PropertyPageContextProps){
    return (
        <PropertyPageContext.Provider value={props}>
            {children}
        </PropertyPageContext.Provider>
    );
}

function usePropertyPageContext(){
    const context = useContext(PropertyPageContext);
    if(!context) throw new Error('usePropertyPageContext must be used within the scope of a PropertyGalleryContext!');
    return context;
}

type AddModalProps = ModalProps;

/**A modal displayed when clicking on the add-new-button in the header of the page. */
function AddModal({children, ...props}: AddModalProps){
    const {state, dispatch} = usePageWithDataContext();
    const {ownerId} = usePropertyPageContext();

    const {data, onChange} = useChangeInput({refId: ownerId});
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        addProperty(data)
        .then((property: any) => {
            dispatch({
                type: 'set_items',
                value: state.items ? [...state.items, property] : [property],
            })
        })
        .catch(err => console.log(err.message))
        .finally(() => {
            setLoading(false);
            props.onHide();
            formRef.current?.reset();
        });
    }

    const formId = 'add-property-form';

    return (
        <Modal {...props}>
            <Modal.Header>Lisää Uusi Talo</Modal.Header>

            <Modal.Body>
                <form id={formId} onSubmit={onSubmit} ref={formRef}>
                    <Form.Group>
                        <Label required={true}>Postinumero</Label>
                        <input name="zipCode" required={true} placeholder="Kirjoita talon postinumero..." onChange={onChange}/>
                        <Form.SubLabel>Postinumeron tulee olla pätevä Suomen postinumero.</Form.SubLabel>
                    </Form.Group>

                    <Form.Group>
                        <Label required={true}>Osoite</Label>
                        <input name="title" required={true} placeholder="Kirjoita talon osoite..." onChange={onChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Label required={true}>Tyyppi</Label>
                        <select onChange={onChange} name="buildingType">
                            {
                                buildingTypes.map(buildingType => <option value={buildingType}>{buildingType}</option>)
                            }
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Label required={false}>Kuvaus</Label>
                        <textarea 
                            name="description" 
                            required={false} 
                            spellCheck={false}
                            placeholder="Kirjoita talon kuvaus..." 
                            onChange={onChange} />
                    </Form.Group>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <SecondaryButton 
                    desktopText='Peruuta' 
                    onClick={props.onHide}
                    disabled={loading}/>

                <PrimaryButton 
                    desktopText='Lähetä' 
                    type="submit" 
                    form={formId}
                    disabled={loading}
                    loading={loading}/>
            </Modal.Footer>
        </Modal>
    )
}

/**Displays a header title, a delete- and an add-button, and contains modals displayed when they are pressed. 
 * Responsible for functinality related to adding and deleting of properties, selected inside the Gallery-component rendered by the parent page.
*/
export function HeaderButtons(){
    const session = useSession();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {state} = usePageWithDataContext();

    const deleteSelecedProperties = async () => {
        const addresses = state.selectedItems.map(prop => prop.title);
        const response = confirm('Olet poistamassa kohteita ' + addresses + '. Oletko varma?');
        if(!response) return;

        for(const item of state.selectedItems){
            //Note: this method does not yet delete the actual files from disk.
            await deleteProperty(item.id)
            .catch(err => toast.error('Talon ' + item.title + ' poisto epäonnistui!'));
        }

        
    }
    return (
        <>
            <AddModal show={showAddModal} onHide={() => setShowAddModal(false)} id="add-property-modal"/>

            <div className={style.headerButtons}>
                <SecondaryButton 
                    desktopText="Poista" 
                    disabled={state.selectedItems.length == 0}
                    mobileIconSrc='/icons/bin.png'
                    onClick={deleteSelecedProperties}/>
                <PrimaryButton 
                    desktopText="Lisää Uusi" 
                    mobileIconSrc="/icons/plus.png" 
                    onClick={() => setShowAddModal(true)}/>
            </div>
        </>
    )
}

export function Header(){
    return (
        <div className={style.header}>
            <h3>Talot</h3>
            <HeaderButtons/>
        </div>
    );
}

type ItemComponentProps = {
    item: any,
}

export function ItemComponent(props: ItemComponentProps){
    const {state, dispatch} = usePageWithDataContext();
    const selected = state.selectedItems.includes(props.item);
    const className = selected ? `${style.item} ${style.selected}` : style.item;

    const deleteItem = () => {
        const response = confirm('Olet poistamassa taloa ' + props.item.title + '. Oletko varma?');
        if(!response) return;

        deleteProperty(props.item.id)
        .catch(err => console.log(err.message));
    }
    
    return (
        <div className={className}>
            <Link href={`/properties/${props.item.id}/info`} className={style.informationContainer}>
                <div className={style.titleContainer}>
                    <img src="/icons/house.png" className={style.icon}/>
                    <h4>{props.item.title}</h4>   
                </div>
                
                <small>{props.item.buildingType}</small>
            </Link>
            
            <div className={style.controlsContainer}>
                <input type="checkbox" onChange={() => dispatch({
                    type: 'select_item',
                    value: props.item,
                })}/>
                <img src="/icons/bin.png" className={style.icon} onClick={deleteItem} style={{cursor: 'pointer'}}/>
            </div>
        </div>
    );
}

function AddButton(props: React.ComponentProps<'div'>){
    return (
        <div className={style.addButton} {...props}>
            <img src="/icons/plus.png"/>
        </div>
    );
}

function DeleteButton(){
    const {state: {selectedItems}} = usePageWithDataContext();

    return (
        selectedItems.length ? 
        <div className={style.deleteButton}>
            <img src="/icons/bin.png"/>
        </div>
        :
        null
    );
}

export function Controls(){
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <>
            <AddModal show={showAddModal} onHide={() => setShowAddModal(false)} id="add-property-modal"/>
            <div className={style.controls}>
                <AddButton onClick={() => setShowAddModal(true)}/>
                <DeleteButton/>
            </div>
        </>
    );
}

export function NavBar(){
    return (
        <nav className={style.navbar}>
            <Link href="/properties">Talot</Link>
            <Link href="/settings">Asetukset</Link>
        </nav>
    )
}