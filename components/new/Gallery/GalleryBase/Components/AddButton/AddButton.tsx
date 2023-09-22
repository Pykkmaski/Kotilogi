import useGalleryContext from "../../GalleryContext";

export default function AddButton(){
    const {dispatch} = useGalleryContext();

    return (
        <button className="primary add" type="button" onClick={() => dispatch({type: 'toggle_add_modal', value: true})}>Lisää Uusi</button>
    );
}