import { useEffect, useState } from "react";
import useGalleryContext from "../GalleryBase/GalleryContext";
import Link from "next/link";
import { CardContext, CardContextValue } from "./CardContext";
import Footer from "./Components/Footer/Footer";
import ImageContainer from "./Components/ImageContainer/ImageContainer";
import Body from "./Components/Body/Body";
import style from './style.module.scss';
import EditModal from "./Components/EditModal/EditModal";

export default function Card(props: GalleryBase.CardProps){
    const {state, dispatch, dbTableName} = useGalleryContext();
    const [isSelected, setIsSelected] = useState(state.selectedItemIds.includes(props.item.id));
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setIsSelected(state.selectedItemIds.includes(props.item.id));
    }, [state.selectedItemIds]); //This is an object. Maybe useMemo

    const imageUrl = props.item.imageUrl || 'public/img/not-found.jpeg';

    const contextValue: CardContextValue = {
        isSelected,
        item: props.item,
        dispatch,
        setMenuOpen,
        menuOpen,
        dbTableName,
    }

    const linkTarget = dbTableName.includes('Files') || dbTableName.includes('Images') ? '_blank' : '_self';
    const containerClassName = isSelected ? `${style.cardContainer} ${style.selected}` : style.cardContainer;

    return (
        <CardContext.Provider value={contextValue}>
            <div className={containerClassName} key={props.key}>
                <ImageContainer imageUrl={imageUrl} title={props.item.title || props.item.fileName || 'Ei Otsikkoa.'}/>
                <Body/>
                <Footer/>
            </div>
        </CardContext.Provider>
    );
}