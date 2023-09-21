import Entry from './Components/Entry/Entry';
import style from './style.module.scss';

type Props = {
    entries: JSX.Element[],
}

export default function ActionSelector(props: Props){
    return (
        <select className={style.actionSelectorContainer}>
            <option value="" selected={true} disabled>Valitse Toiminto</option>
            {props.entries}
        </select>
    )
}