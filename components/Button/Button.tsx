import Image, { StaticImageData } from "next/image"
import style from './style.module.scss';
import Spinner from "../Spinner/Spinner";

export type ButtonProps = {
    loading?: boolean,
    variant?: 'primary' | 'secondary',
} & React.ComponentProps<'button'>

export default function Button({children, variant = 'primary', ...props}: ButtonProps){

    const className = [
        props.className,
        'rounded-md p-2',
        variant === 'primary' ? 'bg-orange-300 text-white hover:bg-orange-200 disabled:bg-slate-500' : 'bg-transparent text-black'
    ]
    return (
        <button {...props} className={className.join(' ')}>
            {props.loading ? <Spinner size="1.2rem"/> : null}
            {children}
        </button>
    );
}