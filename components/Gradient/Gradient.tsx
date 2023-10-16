import style from './style.module.scss';

type Props = {
    direction: 'left' | 'top' | 'bottom' | 'right',
}

export default function Gradient(props: Props){

    return (
        <div className={style.gradientContainer}/>
    )
}