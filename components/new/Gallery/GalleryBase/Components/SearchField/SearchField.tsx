import useGalleryContext from "../../GalleryContext";

export function SearchField(){

    const {dispatch, state} = useGalleryContext();

    const onInputHandler = (e) => {
        dispatch({
            type: 'set_search',
            value: e.target.value,
        });
    }

    return (
        <input type="search" placeholder="Etsi..." onChange={onInputHandler} disabled={state.data.length === 0}/>
    );
}