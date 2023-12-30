"use client";
import AddModal from "./components/AddModal/AddModal";
import {Gallery, useGalleryContext} from "../GalleryBase/Gallery";
import Card from "../GalleryBase/Components/Body/Components/Card/Card";
import PropertiesMenu from "./components/OverlayMenu/PropertiesMenu";
import Error from "../GalleryBase/Components/Error/Error";
import HouseIcon from '@/assets/house.png';
import Body from "../GalleryBase/Components/Body/Body";
import { CSSProperties, useRef, useState } from "react";
import Link from "next/link";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import Form from "kotilogi-app/components/Form/Form";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import { receivePropertyOwnership } from "kotilogi-app/actions/property/receiveOwnership";
import { useSession } from "next-auth/react";
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import toast from "react-hot-toast";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import { SearchField } from "../GalleryBase/Components/SearchField/SearchField";

function SecondaryHeader(props: React.PropsWithChildren){
    const style: CSSProperties = {
        display: 'flex',
        flexFlow: 'column',
        gap: '0.5rem',
        marginBottom: '0.5rem',
    }

    return (
        <div style={style}>
            {props.children}
        </div>
    );
}

function InformationField(props: React.PropsWithChildren){
    const style: CSSProperties = {
        background: 'var(--primary-color)',
        borderRadius: '10px',
        padding: '0.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '25px'
    }

    return (
        <div style={style}>
            {props.children}
        </div>
    );
}

InformationField.Link = ({children, ...props}: React.PropsWithChildren & React.ComponentProps<'span'>) => {
    return <span {...props} style={{cursor: 'pointer', fontWeight: '600'}}>{children}</span>
}

function ItemComponent(props: {
    item: any
}){
    return (
        <Card 
            item={props.item} 
            OverlayMenu={PropertiesMenu}
        />
    );
}

function PropertiesGalleryBody(){

    const [showUseTransferCodeModal, setShowUseTransferCodeModal] = useState(false);
    
    const style: CSSProperties = {
        display: 'flex',
        flexFlow: 'column',
        width: '100%',
    }

    return (
        <>
            <UseTransferCodeModal show={showUseTransferCodeModal} onHide={() => setShowUseTransferCodeModal(false)} id="use-transfer-code-modal"/>
            <div style={style}>
                <Gallery.Body itemComponent={ItemComponent} displayStyle="horizontal" errorComponent={<Error
                    title="Ei Taloja"
                    message="Et ole vielä lisännyt taloja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta."
                    icon={HouseIcon}/>
                }/>
            </div>
        </> 
    )
}

function UseTransferCodeModal(props: ModalProps){
    const formId = `property-use-transfer-code-modal`;
    const session = useSession();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(session.status !== 'authenticated') return;

        try{
            await receivePropertyOwnership(e.target.transferCode.value, session.data!.user?.email as string);
            await serverRevalidatePath('/properties');
            toast.success('Talon omistajuus vastaanotettu onnistuneesti!');
        }
        catch(err){
            toast.error(err.message);
        }
        finally{
            props.onHide();
        }
    }

    return (
        <Modal {...props}>
            <Modal.Header>Vastaanota Talo</Modal.Header>
            <Modal.Body style={{display: 'flex', flexFlow: 'column'}}>
                <p>
                    Jos olet saanut varmenteen, voit siirtää varmenteen viittaaman talo omistajuuden itsellesi.<br/>
                    Saamasi varmenne on käytettävä niin pian kuin mahdollista.
                </p>
                <Form id={formId} onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <Input
                            label="Koodi"
                            name="transferCode"
                            required={true}
                            placeholder="Kirjoita varmenne..."/>
                        <Form.SubLabel>Kirjoita saamasi varmenne tähän.</Form.SubLabel>
                    </Form.Group>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <SecondaryButton desktopText="Peruuta" onClick={props.onHide}/>
                <PrimaryButton desktopText="Käytä Koodi" type="submit" form={formId}/>
            </Modal.Footer>
        </Modal>
    );
}

export default async function PropertiesGallery(props: {
    ownerId: string,
}){ 
    return (
        <Gallery
            tableName="properties"
            query={{
                refId: props.ownerId,
            }}
            title="Talot">
                
            <Gallery.Header title="Talot" AddModal={AddModal}>
      
            </Gallery.Header>
            <PropertiesGalleryBody/>
        </Gallery>
    );
}