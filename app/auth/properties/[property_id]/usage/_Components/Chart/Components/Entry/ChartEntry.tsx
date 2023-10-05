import { useChartSelectorContext } from '../../../ChartSelector/ChartSelectorContext';
import style from './style.module.scss';
import { useState } from "react";

type ChartEntryProps = {
    data: Kotilogi.UsageType,
    key: string,
}

type SettingsButtonProps = {

}

function SettingsButton(props: SettingsButtonProps){
    const [open, setOpen] = useState(false);

    const dotClassName = open ? `settingsButtonDot open` : "settingsButtonDot";

    return (
        <div className={style.settingsButton} onClick={() => setOpen(prev => !prev)}>
            <div className={dotClassName}></div>
            <div className={dotClassName}></div>
            <div className={dotClassName}></div>
        </div>
    )
}

export default function ChartEntry(props: ChartEntryProps){
    const {state, dispatch} = useChartSelectorContext();

    const onChangeHandler = (e) => {
        dispatch({
            type: 'toggle_selected',
            value: props.data.id,
        });
    }

    return (
        <div className={style.chartEntry}>
            <div>
                <span>Päiväys: {new Date(props.data.time).toLocaleDateString('fi-Fi')}</span>
                <span>Hinta: {props.data.price + '€'}</span>
            </div>
            
            <input type="checkbox" onChange={onChangeHandler}></input>
        </div>
    )
}