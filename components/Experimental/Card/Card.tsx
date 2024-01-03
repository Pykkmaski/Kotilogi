import Image from 'next/image';
import style from './style.module.scss';
import React from 'react';

type CardProps = {
    title: string,
    bodyText?: string,
    imageSrc: string,
}

export function Card(props: CardProps){
    return (
        <div className={style.container}>
            <CardImage imageSrc={props.imageSrc}/>
        </div>
    )
}

/**Renders a gradient from bottom to top */
function CardGradient(){
    return (
        <div className={style.imageGradient}/>
    );
}

/**Responsible for rendering the card image, title and the gradient in front of the image. 
 * 
*/
function CardHeaderContainer({children}: React.PropsWithChildren){

    const [image, title] = React.Children.toArray(children);
    return (
        <div className={style.headerContainer}>
            <CardGradient/>
            {image}
            {title}
        </div>
    );
}

function CardImage({imageSrc}: {imageSrc: string}){
    return (
        <div className={style.image}>
            <Image src={imageSrc} fill={true} alt="Card image" objectFit='contain'/>
        </div>
    );
}

function CardTitle({text}: {text: string}){
    return (
        <span className={style.title}>{text}</span>
    );
}