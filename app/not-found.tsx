import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound(){
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tätä sivua ei vielä ole.</h1>
            <p className={styles.message}>
                Rakennamme sivua niin nopeasti kuin pystymme.<br/>
                <Link href="/">Palaa Etusivulle</Link>
            </p>
        </div>
    )
}