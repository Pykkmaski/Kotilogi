import { useState } from "react";
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import { useCardContext } from "../../CardContext";
import style from './style.module.scss';
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import EventsMenu from "./EventsMenu";
import PropertiesMenu from "./PropertiesMenu";
import useGalleryContext from "kotilogi-app/components/new/Gallery/GalleryBase/GalleryContext";

type Props = {
    imageUrl: string,
    title: string,
}

export type MenuProps = {
    showMenu: boolean,
    id: Kotilogi.IdType,
    router: AppRouterInstance,
}


function getMenu(dbTableName: Kotilogi.Table): React.FC<MenuProps> | null{
    switch(dbTableName){
        case 'properties':
           return PropertiesMenu;

        case 'propertyEvents':
            return EventsMenu;

        default: return null;
    }
}

export default function ImageContainer(props: Props){
    const {menuOpen, setMenuOpen, item} = useCardContext();
    const [imageLoading, setImageLoading] = useState(true);

    const {props: {contentType, tableName}} = useGalleryContext();

    const router = useRouter();

    const Menu = getMenu(tableName as Kotilogi.Table);

    const imageOnLoadHandler = (e) => {
        setImageLoading(false);
    };

    const onError = (e) => {
        setImageLoading(false);
        e.target.src = '/img/Events/default-bg.jpg';
    }

    return (
        <div 
            className={style.imageContainer} 
            onMouseEnter={() => setMenuOpen(true)} 
            onMouseLeave={() => setMenuOpen(false)}
            >
            
            {
                Menu ? <Menu showMenu={menuOpen} id={item.id} router={router} /> : null
            }
            

            <div className={style.gradient}/>

            <div className={style.title}>
                {
                    tableName === 'propertyEvents' ? 
                    <>
                        <span className={style.time}>{item.time !== null ? new Date(item.time).toLocaleDateString('fi-FI') : 'Ei Päivämäärää'}</span> 
                        <br/>
                    </>
                    
                    : 
                    null
                }
                <span className={style.name}>{props.title}</span>
            </div>
          
            <div className={style.image}>
                {imageLoading ? <Spinner size="2rem"/> : null}
                <img 
                    src={props.imageUrl} 
                    onError={onError} 
                    className={style.image}
                    alt="Ei Kuvaa"
                    onLoad={imageOnLoadHandler}
                />
            </div>
        </div>
    )
}