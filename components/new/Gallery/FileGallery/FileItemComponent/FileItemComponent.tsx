import Image from 'next/image';
import style from './style.module.scss';
import Link from "next/link";
import FileIcon from '@/assets/copy_filled.png';
import ItemComponent, { useItemComponentContext } from "../../GalleryBase/Components/Body/Components/ItemComponent/ItemComponent";
import FileDeleteModal from "../../Modals/FileDeleteModal";
import { fileNameTimestampSeparator } from "kotilogi-app/constants";
import { useGalleryContext } from "../../GalleryBase/Gallery";

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

    //Only display the original name of the file, without the added timestamp.
    const fileName: string = item.fileName.split(fileNameTimestampSeparator)[1];

    return (
        <div className={className}>
            <Link href={props.destination} target="_blank">
                <Image
                    width={50}
                    height={50}
                    alt=""
                    src={FileIcon}
                />
                {/*If the filename uses a different separator between the timestamp and the actual name of the file, use the unprocessed name.*/}
                <span>{fileName || item.fileName}</span>
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