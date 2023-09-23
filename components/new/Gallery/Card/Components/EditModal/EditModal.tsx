import Form from "kotilogi-app/components/Form";
import Modal from "kotilogi-app/components/Modals/Modal";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import toast from "react-hot-toast";

type Props = {
    item: Kotilogi.ItemType,
    show: boolean,
    toggleModal: (state: boolean) => void,
}

export default function EditModal(props: Props){

    const {dispatch, dbTableName, refId} = useGalleryContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{
            const updatedData = {
                title: e.target.title.value,
                description: e.target.description.value,
            }

            const result = await serverUpdateDataById(updatedData, props.item.id as string, dbTableName);
            if(!result) throw new Error('Päivitys epäonnistui!');
            dispatch({
                type: 'update_data',
                value: result,
            });
            toast.success('Kohteen päivitys onnistui!');

        }
        catch(err){
            console.log(err);
            toast.error('Kohteen päivitys epäonnistui!');
        }
        finally{
            props.toggleModal(false);
        }
    }

    const inputTitleLabel = dbTableName === 'properties' ? 'Osoite' : 'Otsikko';

    return (
        <Modal show={props.show} onHide={() => props.toggleModal(false)} id={`edit-modal-${props.item.id}`}>
            <Modal.Header>Muokkaa</Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <label>{inputTitleLabel}</label>
                        <input name="title" defaultValue={props.item.title} required></input>
                    </Form.Group>

                    <Form.Group>
                        <label>Kuvaus</label>
                        <textarea name="description" defaultValue={props.item.description} spellCheck={false}></textarea>
                        <Form.SubLabel>Muokkaa kuvausta.</Form.SubLabel>
                    </Form.Group>

                    <Form.ButtonGroup>
                        <button type="button" className="secondary" onClick={() => props.toggleModal(false)}>Peruuta</button>
                        <button type="submit" className="primary">Päivitä</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    )
}