import { Suspense, useEffect, useState } from "react";
import useGalleryContext from "../GalleryBase/GalleryContext";
import Link from "next/link";
import Image from "next/image";
import { CardContext, useCardContext, CardContextValue } from "./CardContext";
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import style from './styles.module.scss';

type FooterProps = {
    isSelected: boolean,
    dispatch: any,
    itemId: number
}

function Footer(){
    const {isSelected, dispatch, item, setMenuOpen, menuOpen} = useCardContext();
    
    return (
        <div className='card-footer'>
            <input type="checkbox" checked={isSelected} onInput={() => dispatch({type: 'select_id', value: item.id})}/>
        </div>
    )
}

export type MenuProps = {
    open: boolean,
    id: string | undefined,
    children: React.ReactNode,
}

function Menu({open, id, children}: MenuProps){
    const className = 'card-menu';
    return (
        <dialog className={className} id={id} open={open}>{children}</dialog>
    );
}

type ImageContainerProps = {
    imageUrl: string,
    title: string,
}

function ImageContainer(props: ImageContainerProps){
    return (
        <div className={'card-image-container'}>
            <div className={'card-image-gradient'}/>
            <div className={'card-title'}>{props.title}</div>
          
            <Suspense fallback={<Spinner size="2rem"/>}>
                <img 
                    src={props.imageUrl} 
                    onError={undefined} 
                    className={'card-image'}
                    alt="Ei Kuvaa"
                />
            </Suspense>
        </div>
    )
}

function Body(){
    const {item} = useCardContext();

    return (
        <div className={'card-body'}>
            <div className={'card-text'}>
                {item.description}
            </div>
        </div>
    )
}

export default function Card(props: GalleryBase.CardProps){
    const {state, dispatch, dbTableName} = useGalleryContext();
    const [isSelected, setIsSelected] = useState(state.selectedItemIds.includes(props.item.id));
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setIsSelected(state.selectedItemIds.includes(props.item.id));
    }, [state.selectedItemIds]); //This is an object. Maybe useMemo

    useEffect(() => console.log('Menu open changed'), [menuOpen]);
    const imageUrl = props.item.imageUrl || 'public/img/not-found.jpeg';

    const contextValue: CardContextValue = {
        isSelected,
        item: props.item,
        dispatch,
        setMenuOpen,
        menuOpen
    }

    const linkTarget = dbTableName.includes('Files') || dbTableName.includes('Images') ? '_blank' : '_self';
    const containerClassName = isSelected ? 'card selected' : 'card';
    return (
        <CardContext.Provider value={contextValue}>
            <div className={containerClassName} key={props.key}>
                <Link href={props.destination} target={linkTarget}>
                    <ImageContainer imageUrl={imageUrl} title={props.item.title}/>
                    <Body/>
                </Link>

                <Footer/>
            </div>
        </CardContext.Provider>
    );
}