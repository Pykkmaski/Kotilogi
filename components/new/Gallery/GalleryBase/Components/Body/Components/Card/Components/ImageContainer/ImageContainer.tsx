import { useState } from "react";
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import { useCardContext } from "../../CardContext";
import style from './style.module.scss';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import useGalleryContext from "kotilogi-app/components/new/Gallery/GalleryBase/GalleryContext";

export type MenuProps = {
    showMenu: boolean,
    id: Kotilogi.IdType,
    router: AppRouterInstance,
}

type Props = {
    imageUrl: string,
    title: string,
}

export default function ImageContainer(props: Props){
    const {menuOpen, setMenuOpen, props: {item, OverlayMenu, DeleteModal, titleContent}}  = useCardContext();
    const [imageLoading, setImageLoading]                                   = useState(true);
    const {props: {tableName}}                                              = useGalleryContext();

    const imageOnLoadHandler = (e) => {
        setImageLoading(false);
    };

    const onError = (e) => {
        setImageLoading(false);
        e.target.src = '/img/Events/default-bg.jpg';
    }

    return (
        <div className={style.imageContainer} onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)} onBlur={() => setMenuOpen(false)}>
            {OverlayMenu ? <OverlayMenu show={menuOpen}/> : null}
            
            <div className={style.gradient}/>

            <div className={style.title}>
                {titleContent}
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