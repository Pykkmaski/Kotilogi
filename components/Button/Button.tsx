import Image, { StaticImageData } from "next/image"
import style from './style.module.scss';
import Spinner from "../Spinner/Spinner";

type Props = {
    mobileIconSrc?: StaticImageData | string,
    desktopText: string,
    disabled?: boolean,
    loading?: boolean,
    hidden?: boolean,
    type?: 'button' |'submit',
    className?: string,
    onClick?: () => void,
    form?: string,
}

export default function Button(props: Props){

    const desktopClassName: string = [style.desktopButton, props.className].join(' ');
    const mobileClassName: string = [style.mobileButton, props.className].join(' ');

    const imageSize = 25; //Size in pixels.

    const image: JSX.Element | null = props.loading ? <Spinner size={`${imageSize}px`}/> : props.mobileIconSrc ? (
        <Image
            src={props.mobileIconSrc}
            width={imageSize}
            height={imageSize}
            alt={'add icon'}
        />
    ) : null;

    const BaseButton = ({className, children}) => {
        return (
            <button 
                type={props.type || 'button'} 
                className={className} 
                onClick={props.onClick} 
                disabled={props.disabled}
                form={props.form}
                hidden={props.hidden}
            >
                {children}
            </button>
        );
    }

    return (
        <>
            {/**Desktop devices */}
            <BaseButton className={desktopClassName}>
                {image}
                {props.desktopText}
            </BaseButton>

            {/**Mobile devices */}
            <BaseButton className={mobileClassName}>
                {image || props.desktopText}
            </BaseButton>
        </>
    );
}