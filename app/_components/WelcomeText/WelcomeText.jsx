import Link from 'next/link';
import styles from './styles.module.scss';

function WelcomeText(props){
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>"Talosi Huoltokirja"</h1>
                <h2 className={styles.secondaryTitle}>Korjaushistoria, kulutustiedot, kuvat matkan varrelta.<br/> Kaikki tallessa yhdessä paikassa.</h2>
                <Link href="/register" className={styles.registerLink}>Luo Ilmainen Tili</Link>
            </div>

            <img src="./img/index.jpg" className={styles.image}/>
        </div>
    );
}

export default WelcomeText;