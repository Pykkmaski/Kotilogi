import Image from 'next/image';
import style from './style.module.scss';
import AddIcon from 'kotilogi-app/assets/plus.png';
import { useEffect, useState } from 'react';
import { useGalleryContext } from '../../Util/GalleryContext';
import CardContextProvider, { useCardContext } from './Util/CardContext';
import Link from 'next/link';

type ImageProps = {
    title: string,
    imageId: string,
}

function ImageContainer(props: ImageProps){
    //This might not work if the src is a pdf-file.
    const imageSrc = `/api/files/${props.imageId}`;

    return (
        <div className={style.imageContainer}>
            <span className={style.imageContainerTitle}>{props.title}</span>
            <div className={style.imageContainerGradient}></div>
            <Image
                src={imageSrc}
                alt="Ei kuvaa"
                fill={true}
                className={style.imageContainerImage}
                objectFit="cover"
            />
        </div>
    )
}

type CardBodyProps = {
    content: string,
}

function CardBody(props: CardBodyProps){
    return (
        <div className={style.cardBody}>
            <p>
                {props.content}
            </p>
        </div>
    )
}

function PlusIcon(){
    return (
        <div className={style.plusIconContainer}>
            <h1>+</h1>
        </div>
    );
}

function CardMenuButton(){
    'use client';
    const [buttonClassName, setButtonClassName] = useState(style.cardMenuButton);
    const [menuClassName, setMenuClassName] = useState(style.cardMenu);
    const {item, contentDbSrc, showMenu} = useCardContext();
    const {deleteData, loading, deleteModal} = useGalleryContext();

    useEffect(() => {
        setButtonClassName(
            showMenu ? `${style.cardMenuButton} ${style.buttonOpen}` : style.cardMenuButton
        );

        setMenuClassName(
            showMenu ? `${style.cardMenu} ${style.menuOpen}` : style.cardMenu
        );
    }, [showMenu]);

    const deleteItem = async (e) => {
        if(loading) return;
        deleteData(item.id);
    }

    const destinationUrl = (
        contentDbSrc === 'properties' ? `/auth/properties/new/${item.id}/info`
        :
        contentDbSrc === 'propertyEvents' ? `/auth/events/${item.id}/info`
        :
        undefined
    );

    return (
        <>
            <div className={buttonClassName}>
                <div className={style.cardMenuButtonLine}></div>
                <div className={style.cardMenuButtonLine}></div>
                <div className={style.cardMenuButtonLine}></div>
            </div>
            <div className={menuClassName}>
                <span className={style.control} onClick={deleteItem} hidden={!deleteModal}>Poista</span>
                <Link className={style.control} href={destinationUrl || ''}>Avaa</Link>
            </div>
        </>
        
    );
}

type CardProps = {
    type: 'content' | 'add' | 'empty',
    contentDbSrc?: Kotilogi.Table,
    item?: Kotilogi.PropertyType | Kotilogi.EventType,
}

export default function Card(props: CardProps){
    'use client';
    const [showMenu, setShowMenu] = useState(false);
    const {addData, contentRefId} = useGalleryContext();

    if(
        props.type === 'content' && props.item === undefined 
        || 
        props.type === 'content' && props.contentDbSrc === undefined) throw new Error('A card with the type of \'content\' must have an item and db source defined!');

    return ( 
        props.type === 'content' ? 
        //Content card
        <div 
            className={style.contentCardContainer} 
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
            >
            <CardContextProvider contextValue={{item: props.item, contentDbSrc: props.contentDbSrc, showMenu}}>
                <CardMenuButton/>
                <ImageContainer title={props.item.title} imageId={props.item.mainImageId || props.item.id}/>
                <CardBody content={props.item.description}/>
            </CardContextProvider>
        </div>
        :
        props.type === 'add' ?
        //Add-card with a plus icon in the center
        <div className={style.addCardContainer} onClick={() => addData({title: 'Nimetön', description: 'Ei Kuvausta.', refId: contentRefId})}>
            <PlusIcon/>
            <h2>Lisää Uusi</h2>
        </div>
        :
        props.type === 'empty' ?
        //Empty card
        <div className={style.emptyCardContainer}>

        </div>
        :
        null
    );
}