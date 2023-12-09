"use client";

import Button from 'kotilogi-app/components/Button/Button';
import { useCardContext } from '../../CardContext';
import style from './style.module.scss';
import { useState } from 'react';

export default function HoverOverlay(props: {visible: boolean} & {children: React.ReactNode}){
    const {props: {
        DeleteModal, 
        item
    }, setMenuOpen} = useCardContext();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            {
                DeleteModal ? (
                    <DeleteModal
                        show={showDeleteModal}
                        onHide={() => setShowDeleteModal(false)}
                        id={`item-delete-modal-${item.id}`}
                    />
                )
                :
                null
            }
            
            <div className={style.hoverOverlayContainer} hidden={!props.visible}>
                {props.children}
                {
                    DeleteModal ? 
                    <Button
                        className="danger"
                        desktopText="Poista"
                        onClick={() => {
                            setShowDeleteModal(true);
                            setMenuOpen(false);
                        }}
                    />
                    :
                    null
                }
            </div>
        
        </>
        
    );
}