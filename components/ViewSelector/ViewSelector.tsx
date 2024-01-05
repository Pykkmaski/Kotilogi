'use client';

import style from './style.module.scss';

function BaseButton({children, ...props}: {selected: boolean} & React.ComponentProps<'div'>){
    const className = props.selected ? `${style.button} ${style.selected}` : style.button;

    return (
        <div className={className}>
            {children}
        </div>  
    );
}

function ListViewButton(props: {selected: boolean} ){
    return (
        <BaseButton selected={props.selected}>
            <div className={style.line}/>
            <div className={style.line}/>
            <div className={style.line}/>
        </BaseButton>
    );
}

function CardViewButton(props: {selected: boolean}){
    return (
        <BaseButton selected={props.selected}>
            <div className={style.rect}/>
        </BaseButton>
    );
}

export function ViewSelector(){
    return(
        <div className={style.container}>
            <ListViewButton selected={true}/>
            <CardViewButton selected={false}/>
        </div>
    )
}
