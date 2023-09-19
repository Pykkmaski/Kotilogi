import Link from 'next/link';
import styles from './styles.module.scss';
import Spinner from 'kotilogi-app/components/Spinner/Spinner';
import { getServerSession } from 'next-auth';

async function WelcomeText(props){
    const session = await getServerSession();

    const linkButton = {
        href: !session ? '/register' : '/auth/properties',
        text: !session ? 'Luo Tili' : 'Siirry Taloihisi',
    }

    return (
        <div className={styles.container}>
            <div className={styles.bgOpacity}/>

            <div className={styles.textContainer}>
                <h1 className={styles.title}>Talosi Huoltokirja</h1>
                <p>
                    Korjaushistoria, kulutustiedot, kuvat matkan varrelta.<br/> Kaikki tallessa yhdessä paikassa.
                </p>
                <Link href={linkButton.href} className={styles.registerLink}>{linkButton.text}</Link>
            </div>
        </div>
    );
    
}

export default WelcomeText;