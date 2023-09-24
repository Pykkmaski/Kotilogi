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
                        Kotilogin idea kehittyi kun koitin etsiä salaojaremontin kuitteja kotitalousvähennystä varten.
                        Kuitteja remonteista on kertynyt osa kansioon ja osa sähköpostien sekaan, varmasti myös jokunen kadonnut.<br/><br/>
                        Koitin hetken järjestellä koneelta löytyviä tietoja työpöydälle kansioon jonka nimesin osoitteen mukaan.
                        Siinäpä se sitten välähti että kyllä nykypäivänä taloillakin pitäisi olla "sähköinen huoltokirja".<br/>
                        Sieltä ne taloon tehdyt remontit sun muut olisi helppo kaivaa esiin, seuraavallakin omistajalla vuosien päästä.
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