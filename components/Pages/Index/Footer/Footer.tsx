import ContactForm from "./ContactForm/ContactForm";
import Link from 'next/link';
import style from './style.module.scss';

function Footer(props){
    return (
        <div className={style.container}>
            <div className={style.element}>
                <header>
                    <h1>Ota Yhteyttä</h1>
                </header>

                <p>
                    Kysyttävää? Lähetä meille viesti ja palaamme asiaan mahdollisimman pian.
                    Antamaasi sähköpostia ei käytetä mihinkään muuhun tarkoitukseen kuin viestiisi vastaamiseen.
                </p>

                <ContactForm/>
            </div>

            <footer>
                <Link href="/tos" className={style.tosLink}>Käyttöehdot</Link>
                <div className={style.socials}>
                    <a className="fa fa-instagram" title="Instagram">
                       
                    </a>

                    <a className="fa fa-facebook" title="Facebook">
                        
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default Footer;