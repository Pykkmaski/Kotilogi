import { useEffect, useState } from "react";
import useGalleryContext from "../GalleryBase/GalleryContext";
import Link from "next/link";
import { CardContext, useCardContext, CardContextValue } from "./CardContext";

type FooterProps = {
    isSelected: boolean,
    dispatch: any,
    itemId: number
}

function Footer(){
    const {isSelected, dispatch, item, setMenuOpen, menuOpen} = useCardContext();
    const buttonClassName = menuOpen ? 'card-menu-btn open' : 'card-menu-btn';

    return (
        <div className="card-footer">
            <input type="checkbox" checked={isSelected} onInput={() => dispatch({type: 'select_id', value: item.id})}/>

            <div className={buttonClassName}>
                <img className="cog-img" src={'/img/settings.png'} onClick={() => setMenuOpen(prev => !prev)}/>
                <Menu open={menuOpen} id={undefined}>
                    <nav>
                        <a href="">Poista</a>
                    </nav>
                </Menu>
            </div>
        </div>
    )
}

export type MenuProps = {
    open: boolean,
    id: string | undefined,
    children: React.ReactNode,
}

function Menu({open, id, children}: MenuProps){
    const className = 'card-menu'
    return (
        <dialog className={className} id={id} open={open}>{children}</dialog>
    );
}

type ImageContainerProps = {
    imageUrl: string,
}

function ImageContainer(props: ImageContainerProps){
    return (
        <div className="card-image-container">
            <img src={props.imageUrl} onError={undefined} className='card-image'></img>
        </div>
    )
}

function Body(){
    const {item} = useCardContext();

    return (
        <div className="card-body">
            <div className="card-header">
                <div className="card-title">{item.title}</div>
            </div>

            <div className="card-text">
                {item.description}
            </div>
        </div>
    )
}

export default function Card(props: GalleryBase.CardProps){
    const {state, dispatch} = useGalleryContext();
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

    return (
        <div className={isSelected ? 'card selected' : 'card'} key={props.key}>
            <CardContext.Provider value={contextValue}>
                <Link href={props.destination}>
                   <ImageContainer imageUrl={imageUrl}/>
                    <Body/>
                </Link>

                <Footer/>
            </CardContext.Provider>
        </div>
    );
}