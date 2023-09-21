import style from './style.module.scss';

type Props = {
    direction: 'left' | 'top' | 'bottom' | 'right',
}

export default function Gradient(props: Props){

    const styles = {
        background: `linear-gradient(to ${props.direction}, black, #0001)`,
    }

    return (
        <div style={styles} className={style.container}/>
    )
}