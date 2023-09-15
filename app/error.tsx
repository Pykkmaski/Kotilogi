"use client";

import styles from './not-found.module.scss';

export default function Error({error, reset}){
    return (
        <div className={styles.container}>
            <h1>Hups! Jotain meni pieleen!</h1>
            <h2>Kokeile päivittää sivu.</h2>
        </div>
    )
}