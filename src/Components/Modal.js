import {useEffect, useRef} from 'react';
import useSubComponents from '../Hooks/useSubComponents';

function CloseButton(props){
    return (
        <div className="modal-close-button" onClick={() => props.onHide()} title="Sulje">
            <div className="line"></div>
            <div className="line"></div>
        </div>
    );
}

function Modal(props){
    const {show, onHide} = props;
    const modalElement = useRef(null);
    const subComponents = useSubComponents(Object.keys(Modal), props);

    useEffect(() => {
        //Grab a reference to the modal element.
        modalElement.current = document.querySelector('dialog');
    }, []);

    useEffect(() => {
        //Toggle visibility of the modal when showModal variable is changed.
        if(show === true){
            modalElement.current.showModal();
        }
        else{
            modalElement.current.close();
        }
    }, [show]);

    return (
        <dialog className="component-modal animated">
            <CloseButton onHide={onHide}/>
            {subComponents.map((component) => component)}
        </dialog>
    );
}

const Header = (props) => <div className="modal-header">{props.children}</div>
Modal.Header = Header;

const Title = (props) => <div className="modal-title">{props.children}</div>
Modal.Title = Title;

const Body = (props) => <div className="modal-body">{props.children}</div>
Modal.Body = Body;

const Footer = (props) => <div className="modal-footer">{props.children}</div>
Modal.Footer = Footer;

const Error = (props) => <div className="modal-error">{props.children}</div>
Modal.Error = Error;

export default Modal;