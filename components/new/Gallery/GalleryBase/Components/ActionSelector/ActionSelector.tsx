import Entry from './Components/Entry/Entry';
import style from './style.module.scss';

type Props = {
    children: React.ReactNode,
}

export default function ActionSelector(props: Props){
    return (
        <select className={style.actionSelectorContainer}>
            <option value="" selected={true} disabled={true}>Valitse Toiminto</option>
            {props.children}
        </select>
    )
}