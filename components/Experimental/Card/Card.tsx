import Image from 'next/image';
import style from './style.module.scss';

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

/**Responsible for rendering the card image, title and the gradient in front of the image. */
function CardHeaderContainer({children}: React.PropsWithChildren){
    return (
        <div className={style.headerContainer}>
            {children}
        </div>
    )
}

function CardImage({imageSrc}: {imageSrc: string}){
    return (
        <div className={style.image}>
            <Image src={imageSrc} fill={true} alt="Card image"/>
        </div>
    );
}

function CardTitle({text}: {text: string}){
    return (
        <span className={style.title}>{text}</span>
    );
}