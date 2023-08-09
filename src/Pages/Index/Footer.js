import ContactForm from "./ContactForm";

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
                <a href="/#/tos">Käyttöehdot</a>
            </footer>
        </div>
    )
}

export default Footer;