import ContactForm from "./ContactForm";
import {Link} from 'react-router-dom';

function Footer(props){
    return (
        <div className="group-column" id="home-page-footer">
            

            <div className="footer-element">
                <header>
                    <h1>Ota Yhteyttä</h1>
                </header>

                <p>
                    Kysyttävää? Lähetä meille viesti ja palaamme asiaan mahdollisimman pian.<br/>
                    Antamaasi sähköpostia ei käytetä mihinkään muuhun tarkoitukseen kuin viestiisi vastaamiseen.
                </p>

                <ContactForm/>
            </div>

            <footer>
                <Link to="/tos" id="tos-link">Käyttöehdot</Link>
            </footer>
        </div>
    )
}

export default Footer;