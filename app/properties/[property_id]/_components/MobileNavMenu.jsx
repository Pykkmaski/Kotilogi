"use client";

import {useState} from 'react';
import styles from './component.module.scss';

function Button({setOpen}){
    const toggle = () => setOpen(prev => !prev);

    return (
        <div className={styles.button} onClick={toggle}>
            <div className={styles.line}></div>
        </div>
    );
}

function Body(props){
    return (
        <div className={styles.body}>

        </div>
    )
}

export default function MobileNavMenu(props){
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
            <Button setOpen={setOpen}/>
            {
                open ? <Body/> : null
            }
        </div>
    )
}