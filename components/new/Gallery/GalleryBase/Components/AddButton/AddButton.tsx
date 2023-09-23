import Button from "kotilogi-app/components/Button/Button";
import useGalleryContext from "../../GalleryContext";
import PlusIcon from 'kotilogi-app/assets/plus.png';

export default function AddButton(){
    const {dispatch, state} = useGalleryContext();

    return (
        <Button 
            className='primary' 
            desktopText="Lisää Uusi" 
            mobileIconSrc={PlusIcon} 
            onClick={() => dispatch({type: 'toggle_add_modal', value: true})}
            disabled={state.isLoading}
        />
    );
}