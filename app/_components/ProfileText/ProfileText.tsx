import styles from './styles.module.scss';
import Image from 'next/image';
import profileImage from 'kotilogi-app/public/img/profile1.jpg';

function ProfileText(props){
    return (
        <div className={styles.container}>
            <div className={styles.element}>
                <div className={styles.text}>
                    <h1>Mistä idea?</h1>
                    <p>
                        Kotilogin idea tuli yhtäkkiä päivällä kun koitin etsiä salaojaremontin kuitteja edellisvuodelta kotitalousvähennystä varten.
                        Kuitteja remonteista on kertynyt osa kansioon ja osa sähköpostien sekaan, varmasti myös jokunen kadonnut.
                        Koitin hetken järjestellä koneelta löytyviä työpöydälle kansioon jonka nimesin osoitteen mukaan: Timontie 13.
                        Siinäpä se sitten välähti hetken kuluttua että kyllä nykypäivänä taloillakin pitäisi olla "sähköinen huoltokirja".
                        Sieltä ne taloon tehdyt remontit sun muut olisi helppo kaivaa esiin, seuraavallakin omistajalla kymmenen vuoden päästä.
                    </p>
                    <span className={styles.signature}>Jani Österberg</span>
                </div>

                <div className={styles.imageContainer}>
                    <img src={'./img/profile1.jpg'} className={styles.image}/>
                </div>
            </div>
        </div>
    );
}

export default ProfileText;