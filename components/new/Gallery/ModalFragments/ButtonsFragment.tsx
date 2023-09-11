import Form from "kotilogi-app/components/Form";
import useGalleryContext from "../GalleryBase/GalleryContext";

export default function ButtonsFragment(){
    const {dispatch} = useGalleryContext();
    
    return (
        <Form.ButtonGroup>
            <button className="secondary" type="button" onClick={() => dispatch({type: 'toggle_add_modal', value: false})}>Peruuta</button>
            <button className="primary" type="submit">Lähetä</button>
        </Form.ButtonGroup>
    );
}