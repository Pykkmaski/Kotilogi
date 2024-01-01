import Image from "next/image";
import ItemComponent, { useItemComponentContext } from "../../../GalleryBase/Components/Body/Components/ItemComponent/ItemComponent";
import UsageDeleteModal from "../../UsageDeleteModal";
import style from './style.module.scss';

function Content(){
    const {item, setShowDeleteModal} = useItemComponentContext() as {
        item: {
            id: Kotilogi.IdType, 
            price: number, 
            time: string}, 
            setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    };

    return (
        <div className={style.content}>
            <div>
                <Image
                    src={'/icons/bolt.png'}
                    alt=""
                    width={25}
                    height={25}
                />
                
                <span className={style.time}>{item.time}</span>
                <span className={style.price}>{item.price}</span>
            </div>

            <div>
                <span className={style.controlButton} onClick={() => setShowDeleteModal(true)}>Poista</span>
            </div>
        </div>
    );
}

export default function UsageItemComponent(props: {
    /**
     * The usage data contained in the database.
     */
    item: any,
}){
    return (
        <ItemComponent {...props} DeleteModal={UsageDeleteModal}>
            <Content/>
        </ItemComponent>
    )
}