import useGalleryContext from "../GalleryContext";

type SelectionDropdownProps = {
    children: React.ReactNode,
}

export default function SelectionDropdown(props: SelectionDropdownProps){
    const {dispatch} = useGalleryContext();
    
    return (
        <select>
            
        </select>
    );
}