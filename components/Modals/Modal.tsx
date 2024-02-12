'use client';

import {createContext, useContext, useEffect, useRef} from 'react';
import { Heading } from '../Heading';

function CloseButton(props){
    return (
        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => props.onHide()} title="Sulje">
            <div className="relative w-[32px] h-[32px] flex justify-center items-center">
                <div className="bg-slate-500 absolute w-[2px] h-6 -rotate-45"></div>
                <div className="bg-slate-500 absolute w-[2px] h-6 rotate-45"></div>
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
            <dialog ref={dialogRef} className='rounded-lg sm:p-2 md:p-4 relative shadow-lg animate-slideup-fast' key={props.id} id={props.id}>
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