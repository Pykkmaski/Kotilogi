"use client";

import { useEffect, useRef } from 'react';
//import style from './modal.module.scss';

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

    footer?: {
        buttons: Button[],
    }, 
}

type ModalProps = {
    onHide: () => void,
    id: string,
    show: boolean,
    options: ModalOptions,
    key?: string,
}

export default function Modal(props: ModalProps){
    useEffect(() => {
        const modal = document.querySelector(`dialog#${props.id}`) as HTMLDialogElement;
        if(!modal) return;

        if(props.show){
            modal.showModal();
        }
        else{
            modal.close();
        }
    }, [props.show]);

    const buttons: JSX.Element[] | undefined = props.options.footer?.buttons.map((button: Button, index: number) => {
        return (
            <button 
                key={`${props.id}-footerbutton-${index}`} 
                className={button.variant} 
                type='button' onClick={button.action}>{button.text}</button>
        );
    });

    return(
        <dialog className={'component-modal animated'} key={props.key} id={props.id}>
            <div className={'modal-header'}>
                <span>{props.options.header.text}</span>
                {
                    props.options.header.closeButton ? 
                    <div className={'modal-close-button'} onClick={props.onHide}>
                        <div className={'line'}/>
                        <div className={'line'}/>
                    </div>
                    :
                    null
                }
            </div>
            {props.options.body}
            {
                props.options.footer ? 
                <div className={'modal-footer'}>
                    {buttons}
                </div>
                :
                null
            }
            
        </dialog>
    );
}