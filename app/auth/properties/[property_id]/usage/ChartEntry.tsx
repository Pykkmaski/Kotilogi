import { UsageType } from "kotilogi-app/types/UsageType";
import styles from './page.module.scss';
import { useEffect, useState } from "react";

type ChartEntryProps = {
    data: UsageType,
}

type SettingsButtonProps = {

}

function SettingsButton(props: SettingsButtonProps){
    const [open, setOpen] = useState(false);

    const dotClassName = open ? `settingsButtonDot open` : "settingsButtonDot";
    console.log(open);
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
            <SettingsButton/>
        </div>
    )
}