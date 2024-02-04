import ContactForm from "./ContactForm";
import Link from 'next/link';
import style from './style.module.scss';

function Footer(props){
    return (
        <div className="flex flex-col items-center justify-center pt-[5rem] pb-[5rem] bg-gray-900 gap-4 w-full text-white">
            <div className="flex flex-col items-center gap-4">
                <header>
                    <h1 className="text-3xl">Ota Yhteyttä</h1>
                </header>

                <p className="text-center">
                    Kysyttävää? Lähetä meille viesti ja palaamme asiaan mahdollisimman pian.<br/>
                    Antamaasi sähköpostia ei käytetä mihinkään muuhun tarkoitukseen kuin viestiisi vastaamiseen.
                </p>

                <div className="mt-8">
                    <ContactForm/>
                </div>
            </div>

            <footer>
                <Link href="/tos" className="text-white">Käyttöehdot</Link>
                <div className="flex justify-center gap-4 mt-[2em]">
                    <a className="fa fa-instagram text-white cursor-pointer no-underline before:text-[42px]" title="Instagram">
                       
                    </a>

                    <a className="fa fa-facebook text-white cursor-pointer no-underline before:text-[42px]" title="Facebook">
                        
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default Footer;