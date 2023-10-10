import style from './style.module.scss';

type Props = {
    price: number,
    subText: string,
}

export default function Price(props: Props){
    return (
        <div className={style.priceContainer}>
            <h1>{props.price}/vv</h1>
            <small>{props.subText}</small>
        </div>
    );
}