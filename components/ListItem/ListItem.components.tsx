import Link from "next/link"
import { usePageWithDataContext } from "../PageWithData/PageWithData"
import style from './style.module.scss';
import { useListItemContext } from "./ListItem.hooks";

type TitleContainerProps = {
    titleText: string,
    iconSrc: string,
}

export function TitleContainer(props: TitleContainerProps){
    return (
        <div className={style.titleContainer}>
            <img src={props.iconSrc} className={style.icon}/>
            <h4>{props.titleText}</h4>   
        </div>
    )
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
    const {item} = useListItemContext() as {item : any};
    
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