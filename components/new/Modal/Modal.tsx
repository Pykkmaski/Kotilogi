"use client";

import { useEffect, useRef } from 'react';
import style from './modal.module.scss';

type Button = {
    text: string,
    variant: 'primary' |'secondary',
    action?: () => void,
}

export type ModalOptions = {
    header: {
        text: string,
        closeButton?: boolean,
    },

    body: JSX.Element,

    footer: {
        buttons: Button[],
    }, 
}

type ModalProps = {
    onHide: () => void,
    show: boolean,
    options: ModalOptions,
}

export default function Modal(props: ModalProps){
    const modalId = useRef<string>(crypto.randomUUID()); //This wont work if not on an https server!

    useEffect(() => {
        const modal = document.querySelector('dialog#' + modalId.current) as HTMLDialogElement;
        if(props.show){
            modal.showModal();
        }
        else{
            modal.close();
        }
    }, [props.show]);

    const buttons: JSX.Element[] = props.options.footer.buttons.map((button: Button, index: number) => {
        return (
            <button 
                key={`${modalId.current}-footerbutton-${index}`} 
                className={button.variant} 
                type='button' onClick={button.action}>{button.text}</button>
        );
    });

    return(
        <dialog className={style.container} open={props.show} key={modalId.current} id={modalId.current}>
            <div className={style.header}>
                <span>{props.options.header.text}</span>
                {
                    props.options.header.closeButton ? 
                    <div className={style.closeButton} onClick={props.onHide}>
                        <div className={style.buttonLine}/>
                        <div className={style.buttonLine}/>
                    </div>
                    :
                    null
                }
            </div>
            {props.options.body}
            <div className={style.footer}>
                {buttons}
            </div>
        </dialog>
    );
}