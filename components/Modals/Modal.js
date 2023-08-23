import {useEffect, useRef} from 'react';
import useSubComponents from 'kotilogi-app/hooks/useSubComponents';

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
    const subComponents = useSubComponents(Object.keys(Modal), props);
    const id = 'modal-' + (Math.round(Math.random() * 0x10000)).toString(16);
    const modalElement = useRef(null);

    useEffect(() => {
        //Grab a reference to the modal element.
        modalElement.current = document.querySelector(`dialog#${id}`);
    }, []);

    useEffect(() => {
        //Toggle visibility of the modal when showModal variable is changed.
        if(!modalElement.current) return;

        if(show === true){
            modalElement.current.showModal();
        }
        else{
            modalElement.current.close();
        }
    }, [show]);

    return (
        <dialog className="component-modal animated" key={props.key} id={id}>
            <CloseButton onHide={onHide}/>
            {subComponents.map((component) => component)}
        </dialog>
    );
}

const Header = (props) => <div className="modal-header">{props.children}</div>
Modal.Header = Header;

const Title = (props) => <div className="modal-title">{props.children}</div>
Modal.Title = Title;

const Body = (props) => <span className="modal-body">{props.children}</span>
Modal.Body = Body;

const Image = (props) => <img src={props.src} className="modal-image"/>
Modal.Image = Image;

const Footer = (props) => <div className="modal-footer">{props.children}</div>
Modal.Footer = Footer;

const Error = (props) => <div className="modal-error">{props.children}</div>
Modal.Error = Error;

export default Modal;