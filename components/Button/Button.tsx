import Image, { StaticImageData } from "next/image"
import style from './style.module.scss';
import Spinner from "../Spinner/Spinner";

export type ButtonProps = {
    mobileIconSrc?: string,
    desktopText: string,
    loading?: boolean,
} & React.ComponentProps<'button'>

export default function Button(props: ButtonProps){

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

    const BaseButton = ({children, className}) => {
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