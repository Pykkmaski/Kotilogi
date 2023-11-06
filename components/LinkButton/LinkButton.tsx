import style from './style.module.scss';

type Props = {
    href: string,
    text: string,
    className?: string,
}

export default function LinkButton(props: Props){
    const className = props.className ? `${style.linkButtonContainer} ${props.className}` : style.linkButtonContainer;

    return (
        <a href={props.href} className={className}>{props.text}</a>
    );
}