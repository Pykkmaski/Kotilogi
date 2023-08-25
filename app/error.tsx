"use client";

import styles from './loading.module.scss';

export default function Error({error, reset}){
    return (
        <div className={styles.container}>
            <h1>Hups! Jotain meni pieleen!</h1>
        </div>
    )
}