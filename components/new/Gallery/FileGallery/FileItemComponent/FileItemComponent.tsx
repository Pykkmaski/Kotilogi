import { StaticImageData } from "next/image";
import Image from 'next/image';
import style from './style.module.scss';
import Link from "next/link";
import useGalleryContext from "../../GalleryBase/GalleryContext";
import FileIcon from '@/assets/copy_filled.png';
import ItemComponent, { useItemComponentContext } from "../../GalleryBase/Components/Body/Components/ItemComponent/ItemComponent";
import ItemDeleteModal from "kotilogi-app/components/new/Gallery/Modals/ItemDeleteModal";
import FileDeleteModal from "../../Modals/FileDeleteModal";

function Content(props: {
    destination: string,

}){
    const {dispatch, state} = useGalleryContext();
    const {setShowDeleteModal, item} = useItemComponentContext();
    const selected = state.selectedItems.includes(item);

    const className = selected ? `${style.item} ${style.selected}` : style.item;

    const selectItem = () => {
        dispatch({
            type: 'select_item',
            value: item,
        });
    }

    return (
        <div className={className}>
            <Link href={props.destination} target="_blank">
                <Image
                    width={50}
                    height={50}
                    alt=""
                    src={FileIcon}
                />
                
                <span>{item.fileName}</span>
            </Link>
            <div>
                <span className={style.deleteLink} onClick={() => setShowDeleteModal(true)}>Poista</span>
                <input type="checkbox" checked={selected} onInput={selectItem}></input>
            </div>
        </div>
    );
}

export default function FileItemComponent(props: {
    item: {
        fileName: string,
    },

    /**
     * The link to the file. Used when clicking on the component.
     */
    destination: string,
}){

    return (
        <ItemComponent {...props} DeleteModal={FileDeleteModal}>
            <Content {...props}/>
        </ItemComponent>
    );
}