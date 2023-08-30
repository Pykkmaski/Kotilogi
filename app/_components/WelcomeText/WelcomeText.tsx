import Link from 'next/link';
import styles from './styles.module.scss';
import Spinner from 'kotilogi-app/components/Spinner/Spinner';
import { getServerSession } from 'next-auth';

async function WelcomeText(props){
    const session = await getServerSession();

    const linkButton = {
        href: !session ? '/register' : '/properties',
        text: !session ? 'Luo Tili' : 'Siirry Taloihisi',
    }

    return (
        <div className={styles.container}>
            
            <div className={styles.textContainer}>
                <h1 className={styles.title}>"Talosi Huoltokirja"</h1>
                <h2 className={styles.secondaryTitle}>Korjaushistoria, kulutustiedot, kuvat matkan varrelta.<br/> Kaikki tallessa yhdessä paikassa.</h2>
            </div>
            <Link href={linkButton.href} className={styles.registerLink}>{linkButton.text}</Link>
            <Link href="/login" className={styles.loginLink} hidden={!session}>Tai Kirjaudu Sisään</Link>
            <div className={styles.bgOpacity}/>
        </div>
    );
    
}

export default WelcomeText;