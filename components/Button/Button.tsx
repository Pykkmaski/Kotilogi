import Image, { StaticImageData } from "next/image"
import style from './style.module.scss';
import Spinner from "../Spinner/Spinner";

type Props = {
    mobileIconSrc: StaticImageData | string,
    desktopText: string,
    disabled?: boolean,
    loading?: boolean,
    type?: 'button' |'submit',
    className?: string,
    onClick?: () => void,
}

export default function Button(props: Props){

    const desktopClassName: string = [style.desktopButton, props.className].join(' ');
    const mobileClassName: string = [style.mobileButton, props.className].join(' ');

    const imageSize = 30; //Size in pixels.

    const image: JSX.Element = props.loading ? <Spinner size={`${imageSize}px`}/> : (
        <Image
            src={props.mobileIconSrc}
            width={imageSize}
            height={imageSize}
            alt={'add icon'}
        />
    );

    return (
        <>
            {/**Desktop devices */}
            <button type={props.type || 'button'} className={desktopClassName} onClick={props.onClick} disabled={props.disabled}>
                {image}
                {props.desktopText}
            </button>

            {/**Mobile devices */}
            <button className={mobileClassName} disabled={props.disabled} onClick={props.onClick}>
                {image}
            </button>
        </>
    );
}