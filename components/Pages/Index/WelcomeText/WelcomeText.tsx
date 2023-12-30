import Link from 'next/link';
import styles from './styles.module.scss';
import Spinner from 'kotilogi-app/components/Spinner/Spinner';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';

type SessionT = {
    user: {
        email: string,
    }
}

function LinkButton(props: {
    session: SessionT | null,
}){
    const href = !props.session ? '/register' : '/properties';
    const text = !props.session ? 'Luo Tili' : 'Siirry Taloihisi';

    return (
        <Link href={href} className={styles.registerLink}>{text}</Link>
    );
}

async function WelcomeText(){
    const session: SessionT | null = await getServerSession(options);

    return (
        <div className={styles.container}>
            <div className={styles.bgOpacity}/>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Talosi Huoltokirja</h1>
                <p>
                    Korjaushistoria, kulutustiedot, kuvat matkan varrelta.<br/> Kaikki tallessa yhdessä paikassa.
                </p>
                <LinkButton session={session}/>
            </div>
        </div>
    );
    
}

export default WelcomeText;