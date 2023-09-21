import { Suspense } from "react";
import HoverOverlay from "../HoverOverlay/HoverOverlay";
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import { useCardContext } from "../../CardContext";
import style from './style.module.scss';

type Props = {
    imageUrl: string,
    title: string,
}

export default function ImageContainer(props: Props){
    const {menuOpen} = useCardContext();

    return (
        <div className={style.imageContainer}>
            <HoverOverlay visible={menuOpen}>
                <button className="primary">Muokkaa</button>
                <button className="secondary">Avaa</button>
            </HoverOverlay>

            <div className={style.gradient}/>
            <div className={style.title}>{props.title}</div>
          
            <Suspense fallback={<Spinner size="2rem"/>}>
                <img 
                    src={props.imageUrl} 
                    onError={undefined} 
                    className={style.image}
                    alt="Ei Kuvaa"
                />
            </Suspense>
        </div>
    )
}