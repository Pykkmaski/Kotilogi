import style from './style.module.scss';

type Props = {
    href: string,
    text: string,
    className?: string,
}

export default function LinkButton(props: Props){
    const className = props.className ? `${style.linkButton} ${props.className}` : style.linkButton;

    return (
        <a href={props.href} className={className}>{props.text}</a>
    );
}