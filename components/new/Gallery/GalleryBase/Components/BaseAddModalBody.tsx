import Form from "kotilogi-app/components/Form"
import DescriptionFragment from "../../ModalFragments/DescriptionFragment"
import ButtonsFragment from "../../ModalFragments/ButtonsFragment"
import useGalleryContext from "../GalleryContext"
import { serverAddData } from "kotilogi-app/actions/serverAddData"
import upload from "kotilogi-app/actions/upload"

type BaseAddModalProps = {
    additionalContent?: JSX.Element,
}

export default function BaseAddModalBody(props: BaseAddModalProps){
    const {dbTableName, refId, dispatch} = useGalleryContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        var addedData;

        try{
            dispatch({
                type: 'toggle_loading',
                value: true,
            });

            const file = e.target.file?.files[0];
            if(file){
                const data = new FormData();
                data.set('file', file);
                data.set('title', e.target.title.value);
                data.set('description', e.target.description.value);
                data.set('ref_id', refId);

                addedData = await upload(data, dbTableName);
                if(!addedData) throw new Error('Failed to add data!');
            }
            else{
                const data = {
                    title: e.target.title.value,
                    description: e.target.description.value,
                    ref_id: refId,
                }

                addedData = await serverAddData(data, dbTableName);
                if(!addedData) throw new Error('Failed to add data!');
            }
        }
        catch(err){
            console.log(err.message);
        }
        finally{
            dispatch({
                type: 'add_data',
                value: addedData,
            });

            dispatch({
                type: 'toggle_loading',
                value: false,
            })
        }
    }

    const labelText: string = dbTableName === 'properties' ? 'Osoite' : 'Otsikko';

    return (
        <Form onSubmit={onSubmitHandler}>
            {props.additionalContent}
            <Form.Group>
                <label>{labelText}</label>
                <input type="text" name='title' required></input>
            </Form.Group>

            <DescriptionFragment/>
            <ButtonsFragment/>
        </Form>
    );
}