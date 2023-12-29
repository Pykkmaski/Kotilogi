import { useCardContext } from "../../CardContext";
import style from './style.module.scss';

export default function Body(){
    const {props:{item}} = useCardContext();

    return (
        <div className={style.container}>
            <div className={style.text}>
                {item.description || 'Ei Kuvausta.'}
            </div>
        </div>
    )
}