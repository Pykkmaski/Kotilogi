import styles from './page.module.scss';
import { useState } from "react";

type ChartEntryProps = {
    data: Kotilogi.UsageType,
}

type SettingsButtonProps = {

}

function SettingsButton(props: SettingsButtonProps){
    const [open, setOpen] = useState(false);

    const dotClassName = open ? `settingsButtonDot open` : "settingsButtonDot";

    return (
        <div className={styles.settingsButton} onClick={() => setOpen(prev => !prev)}>
            <div className={dotClassName}></div>
            <div className={dotClassName}></div>
            <div className={dotClassName}></div>
        </div>
    )
}

export default function ChartEntry(props: ChartEntryProps){
    return (
        <div className={styles.chartEntry}>
            <span>Päiväys: {new Date(props.data.time).toLocaleDateString('fi-Fi')}</span>
            <span>Hinta: {props.data.price + '€'}</span>
        </div>
    )
}