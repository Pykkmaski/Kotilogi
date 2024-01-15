import Link from "next/link"
import { usePageWithDataContext } from "../PageWithData/PageWithData"
import style from './style.module.scss';
import { useListItemContext } from "./ListItem.hooks";
import { Group } from "../Group/Group";

type TitleContainerProps = {
    titleText: string,
    iconSrc: string,
}

export function TitleContainer(props: TitleContainerProps){
    return (
        <div className={style.titleContainer}>
            <img src={props.iconSrc} className={style.icon}/>
            <span className={style.title}>{props.titleText}</span>   
        </div>
    )
}

type EventTitleContainerProps = TitleContainerProps & {
    isConsolidated: boolean,
}

export function EventTitleContainer({isConsolidated, ...props}: EventTitleContainerProps){
    return (
        <Group direction="horizontal" alignItems="baseline">
            {
                isConsolidated ? <img src="/icons/padlock.png" className={style.icon} title="Tapahtuma on vakiinnutettu, eikä sitä voi muokata."/> 
                : 
                null
            }
            <TitleContainer {...props}/>
            {!isConsolidated ? <div className={style.notConsolidatedTitle} title="Tapahtumaa ei ole vakiinnutettu ja on poistettavissa.">Vakiinnuttamaton</div> : null }
        </Group>
    );
}

type DescriptionContainerProps = {
    text: string,
}

export function DescriptionContainer(props: DescriptionContainerProps){
    return (
        <div className={style.description}>{props.text}</div>
    );
}

type InfoContainerProps = React.PropsWithChildren & {
    /**The link to the page clicking this component will route to */
    href: string,

}

export function InfoContainer({children, ...props}: InfoContainerProps){
    return (
        <Link href={props.href} className={style.informationContainer}>
            {children}
        </Link>
    )
}

export function CheckBox(){
    const {dispatch} = usePageWithDataContext();
    const {item} = useListItemContext();
    
    return (
        <input type="checkbox" onChange={() => dispatch({
            type: 'select_item',
            value: item,
        })}/>
    )
}

export function DeleteButton(props: React.ComponentProps<'img'> & {
    onClick: () => void,
}){
    return (
        <img src="/icons/bin.png" className={style.icon} onClick={props.onClick} style={{cursor: 'pointer'}}/>
    );
}

export function ControlsContainer({children}: React.PropsWithChildren){
    return (
        <div className={style.controlsContainer}>
            {children}
        </div>
    )
}