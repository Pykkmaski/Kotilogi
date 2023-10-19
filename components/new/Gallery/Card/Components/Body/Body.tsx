import { useCardContext } from "../../CardContext";
import Menu from "../Menu/Menu";
import style from './style.module.scss';

export default function Body(){
    const {item, menuOpen} = useCardContext();

    return (
        <div className={style.container}>
            <div className={style.text}>
                {item.description}
            </div>
        </div>
    )
}