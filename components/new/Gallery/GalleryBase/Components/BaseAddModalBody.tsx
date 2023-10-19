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
            var fileName: string | null = null;
            var data: any = {refId};
            
            if(file){
                const formData = new FormData();
                formData.set('file', file);
                fileName = await upload(formData, dbTableName);
                if(!fileName) throw new Error('Failed to add data!');
                data = {
                    ...data,
                    fileName,
                }
            }

            //Get all input elements, ignoring files, as they have already been uploaded at this point.
            const formInputElements = [...e.target.elements].filter(item => (item.tagName === 'INPUT' || item.tagName === 'TEXTAREA') && item.name !== undefined && item.name !== 'file');
            
            //Insert the input values.
            formInputElements.forEach(elem => {
                //Convert non-null date inputs into milliseconds since epoch. Otherwise use the value as is.
                var value: number | string | null = null;

                if(elem.type === 'date'){
                    value = elem.value !== '' ? new Date(elem.value).getTime() : null;
                    console.log(value);
                }
                else{
                    value = elem.value;
                }

                data = {
                    ...data,
                    [elem.name] : value,
                }
            });

            /*
            const data = fileName ? {
                title: e.target.title.value,
                description: e.target.description.value,
                refId,
                fileName,
            }
            :
            {
                title: e.target.title.value,
                description: e.target.description.value,
                refId,
            }
            */

            addedData = await serverAddData(data, dbTableName);
            if(!addedData) throw new Error('Failed to add data!');
            
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
            });

            dispatch({
                type: 'toggle_add_modal',
                value: false,
            });
        }
    }

    const labelText: string = dbTableName === 'properties' ? 'Osoite' : 'Otsikko';

    return (
        <Form onSubmit={onSubmitHandler}>
            {props.additionalContent}

            {
                /**Only ask for a title if uploading something other than a file or an image. */
                !dbTableName.includes('Files') && !dbTableName.includes('Images')
                ?
                <Form.Group>
                    <label>{labelText}</label>
                    <input type="text" name='title' required></input>
                </Form.Group>
                :
                null
            }
            

            <DescriptionFragment/>
            <ButtonsFragment/>
        </Form>
    );
}