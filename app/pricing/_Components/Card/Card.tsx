import style from './style.module.scss';
import Price from './Components/Price';

type Props = {
    children: React.ReactNode,
}

function Card(props: Props){
    return (
        <div className={style.cardContainer}>
           {props.children}
        </div>
    );
}

Card.Price = Price;

export default Card;

