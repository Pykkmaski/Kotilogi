'use client';

import { serverAddData } from "kotilogi-app/actions/serverAddData";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import useGalleryContext from "../GalleryBase/GalleryContext";
import toast from "react-hot-toast";

export default function AddModal(props: {
    show: boolean,
    onHide: () => void,
    type: string,
}){

    const {props: {tableName, query}, dispatch} = useGalleryContext();
    const [currentData, setCurrentData]         = useState({refId: query.refId, type: props.type});
    const [loading, setLoading]                 = useState(false);

    
    const modalId                               = 'add-usage-modal';
    const formId                                = `form-add-usage-data`;

    const onChangeHandler = (e) => {
        setCurrentData({
            ...currentData,
            [e.target.name] : e.target.value,
        });
        console.log(currentData);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await serverAddData(currentData, tableName);
        if(!result){
            toast.error('Tiedon lisäys epäonnistui!');
        }
        else{
            dispatch({
                type: 'add_data',
                value: result,
            });

            toast.success('Tiedon lisäys onnistui!');
        }

        setLoading(false);
        props.onHide();
    }
    
    return (
        <Modal show={props.show} onHide={props.onHide} id={modalId}>
            <Modal.Header>
                {
                    props.type === 'heat' ? 'Lisää lämmityskulutieto'
                    :
                    props.type === 'water' ? 'Lisää veden kulutustieto'
                    :
                    props.type === 'electric' ? 'Lisää sähkön kulutustieto'
                    :
                    null
                }
            </Modal.Header>
            
            <Modal.Body>
                <Form id={formId} onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <label>Euromäärä</label>
                        <input type="number" name="price" required={true} step={0.01} onChange={onChangeHandler}/>
                    </Form.Group>

                    <Form.Group>
                        <label>Päivämäärä</label>
                        <input type="date" name="time" required={true} onChange={onChangeHandler}/>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className="secondary"
                    desktopText="Peruuta"
                    onClick={props.onHide}
                    disabled={loading}
                />

                <Button
                    className="primary"
                    desktopText="Lähetä"
                    type="submit"
                    form={formId}
                    disabled={loading}
                    loading={loading}
                />
            </Modal.Footer>
        </Modal>
    )
}