"use client";

import Modal from 'kotilogi-app/components/Modals/Modal';
import style from './style.module.scss';
import { MouseEventHandler, useState } from 'react';
import Form from 'kotilogi-app/components/Form';
import Button from 'kotilogi-app/components/Button/Button';

/**
 * A component to display database column values.
 * Returns the entry container and a modal to edit the content.
 */

type Props = {
    label: string,
    value: string,
    hidden: boolean,
    id: string,
    type: 'number' | 'text' | 'date' | 'textarea',
    defaultValue: string,
    onClick?: MouseEventHandler,
}

export default function DbColumn(props: Props){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)} id={`dbcolumn-edit-modal-${props.id}`}>
                <Modal.Header>Muokkaa Tietoa</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <label>{props.label}</label>
                            <input type={props.type} required defaultValue={props.defaultValue}></input>
                        </Form.Group>

                        <Form.ButtonGroup>
                            <Button 
                                desktopText="Peruuta"
                                onClick={() => setShowModal(false)}
                                disabled={false}
                                className='secondary'
                            />

                            <Button
                                desktopText="Päivitä"
                                type="submit"
                                className='primary'
                            />
                        </Form.ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className={style.container} onClick={props.onClick} key={props.id}>
                <span className={style.label}>{props.label}</span>
                <span className={style.value}>{props.value}</span>
            </div>
        </>
        
    )
}