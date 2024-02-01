'use client';

import {createContext, useContext, useEffect, useRef} from 'react';
import { Heading } from '../Heading/Heading';

function CloseButton(props){
    return (
        <div className="absolute top-4 right-8 flex flex-col justify-center items-center cursor-pointer" onClick={() => props.onHide()} title="Sulje">
            <div className="relative">
                <div className="bg-slate-500 w-[1px] h-6 absolute -rotate-45"></div>
                <div className="bg-slate-500 w-[1px] h-6 absolute rotate-45"></div>
            </div>
        </div>
    );
}

const ModalContext = createContext<{onHide: () => void} | null>(null);

export type ModalProps = React.PropsWithChildren & {
    id: string,
    className?: string,
    show: boolean,
    onHide: () => void,
}

function Modal(props: ModalProps){
    const {show, onHide} = props;
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    
    useEffect(() => {
        //Toggle visibility of the modal when showModal variable is changed.
        if(!dialogRef.current) return;

        if(show === true){
            dialogRef.current.showModal();
        }
        else{
            dialogRef.current.close();
        }
    }, [show]);

    return (
        <ModalContext.Provider value={{onHide}}>
            <dialog ref={dialogRef} className='rounded-lg p-4 relative' key={props.id} id={props.id}>
            {props.children}
            </dialog>
        </ModalContext.Provider>
    );
}

const Header = ({children}) => {
    const {onHide} = useModalContext();
    return <div className="w-full border-b-[1px] mb-4 pt-2 pb-2 justify-between">{children} <CloseButton onHide={onHide}/></div>
};

Modal.Header = Header;

const Title = (props) => <div className="text-slate-400">{props.children}</div>
Modal.Title = Title;

const Body = (props: React.ComponentProps<'div'>) => {
    const baseClassName = 'modal-body';
    const className = props.className ? `${baseClassName} ${props.className}` : baseClassName;
    
    return <div className='flex flex-col w-full'>{props.children}</div>
}
Modal.Body = Body;

const Image = (props) => <img src={props.src} className="modal-image"/>
Modal.Image = Image;

const Footer = (props) => <div className="w-full border-t-[1px] pt-2 pb-2 mt-4 justify-end flex flex-row">{props.children}</div>
Modal.Footer = Footer;

const ModalError = (props) => <div className="modal-error">{props.children}</div>
Modal.Error = ModalError;

function useModalContext(){
    const context = useContext(ModalContext);
    if(!context) throw new Error('useModalContext must only be used within the scope of a ModalContext!');
    return context;
}

export default Modal;