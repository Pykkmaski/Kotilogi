'use client';

import {useEffect} from 'react';
import { Heading } from '../Heading/Heading';

function CloseButton(props){
    return (
        <div className="modal-close-button" onClick={() => props.onHide()} title="Sulje">
            <div className="line"></div>
            <div className="line"></div>
        </div>
    );
}

export type ModalProps = React.PropsWithChildren & {
    id: string,
    className?: string,
    show: boolean,
    onHide: () => void,
}

function Modal(props: ModalProps){
    const {show, onHide} = props;

    useEffect(() => {
        //Toggle visibility of the modal when showModal variable is changed.
        const modal = document.querySelector(`dialog#${props.id}`) as HTMLDialogElement;
        if(!modal) return;

        if(show === true){
            modal.showModal();
        }
        else{
            modal.close();
        }
    }, [show]);

    const className = props.className ? `component-modal ${props.className} animated` : 'component-modal animated';

    return (
        props.show ? 
        <dialog className={className} key={props.id} id={props.id}>
            <CloseButton onHide={onHide}/>
           {props.children}
        </dialog>
        :
        null
    );
}

const Header = (props) => <div className="modal-header"><Heading>{props.children}</Heading></div>
Modal.Header = Header;

const Title = (props) => <div className="modal-title">{props.children}</div>
Modal.Title = Title;

const Body = (props: React.ComponentProps<'div'>) => {
    const baseClassName = 'modal-body';
    const className = props.className ? `${baseClassName} ${props.className}` : baseClassName;
    
    return <div className={className}>{props.children}</div>
}
Modal.Body = Body;

const Image = (props) => <img src={props.src} className="modal-image"/>
Modal.Image = Image;

const Footer = (props) => <div className="modal-footer">{props.children}</div>
Modal.Footer = Footer;

const Error = (props) => <div className="modal-error">{props.children}</div>
Modal.Error = Error;

export default Modal;