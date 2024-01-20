"use client";

import styles from './not-found.module.scss';

export default function Error({error, reset}){
    return (
        <div className={styles.container}>
            <h1>Hups! Kohtasimme virheen!</h1>
            <p>
                {error}
            </p>
            <h2>Kokeile päivittää sivu.</h2>
            {reset}
        </div>
    )
}