import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import useGalleryContext from "@/components/new/Gallery/GalleryBase/GalleryContext";
import toast from "react-hot-toast";
import style from './style.module.scss';

export default function CardDeleteModal(props: ModalProps & {item: Kotilogi.ItemType}){

    const {props: {tableName}, dispatch}    = useGalleryContext();
    const [loading, setLoading]             = useState(false);

    const deleteFormId = `form-${props.id}`;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        //Delete the event
        const result = await serverDeleteDataByIds([props.item.id], tableName);

        if(!result){
            toast.error('Kohteen poisto epäonnistui!');
        }
        else{
            dispatch({
                type: 'delete_data',
                value: props.item.id,
            });

            toast.success('Kohteen poisto onnistui!');
            props.onHide();
        }

        setLoading(false);
    }

    return (
        <Modal show={props.show} onHide={props.onHide} id={`item-delete-modal-${props.item.id}`}>
            <Modal.Header>Poista</Modal.Header>
            <Modal.Body className={style.deleteModalBody}>
                <p>
                    <strong>id: ({props.item.id}).</strong><br/><br/>
                    Anna poistolle selvitys. 
                    Selvitys tallennetaan talon muutoshistoriaan ja sen avulla saa selvän kuvan miksi kukin muutos on tehty.<br/><br/>
                    Poisto on pysyvä.
                </p>

                <Form id={deleteFormId} onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <label>Poiston syy<span className="danger">*</span></label>
                        <textarea name="comment" required={true}/>
                    </Form.Group>

                    <div className={style.checkboxContainer}>
                        <label>Ymärrän että poisto on pysyvä:</label>
                        <input type="checkbox" required={true}/>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="secondary"
                    desktopText="Poista"
                    disabled={loading}
                    type="submit"
                    form={deleteFormId}
                />

                <Button
                    className="primary"
                    desktopText="Peruuta"
                    disabled={loading}
                    loading={loading}
                    onClick={props.onHide}
                />
            </Modal.Footer>
        </Modal>
    )
}