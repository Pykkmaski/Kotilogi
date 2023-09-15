import Form from "kotilogi-app/components/Form";
import useGalleryContext from "../GalleryBase/GalleryContext";

export default function ButtonsFragment(){
    const {dispatch, state} = useGalleryContext();

    return (
        <Form.ButtonGroup>
            <button className="secondary" type="button" onClick={() => dispatch({type: 'toggle_add_modal', value: false})} disabled={state.isLoading}>Peruuta</button>
            <button className="primary" type="submit" disabled={state.isLoading}>Lähetä</button>
        </Form.ButtonGroup>
    );
}