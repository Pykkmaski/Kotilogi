import ContactForm from "./ContactForm";
import Link from 'next/link';
import style from './style.module.scss';

type LinkIconProps = React.ComponentProps<'a'> & {
    variant: 'ig' | 'sc',
}

const LinkIcon: React.FC<LinkIconProps> = ({children, variant, ...props}) => {
    const className = [
        "fa text-white cursor-pointer hover:no-underline before:text-[42px]",
        variant === 'ig' ? 'fa-instagram' : variant === 'sc' ? 'fa-soundcloud' : '',
    ];

    return (
        <a className={className.join(' ')} target="_blank" {...props}>{children}</a>
    );
}

function Footer(props){
    return (
        <div className="flex flex-col justify-center pt-[5rem] pb-[5rem] bg-gray-900 gap-4 w-full text-white">
            <div className="flex flex-col gap-4 xs:px-4 md:px-32 md:items-center xs:items-[none]">
                <header>
                    <h1 className="text-3xl text-center">Ota Yhteyttä</h1>
                </header>

                <p className="text-center">
                    Kysyttävää? Lähetä meille viesti ja palaamme asiaan mahdollisimman pian.<br/>
                    Antamaasi sähköpostia ei käytetä mihinkään muuhun tarkoitukseen kuin viestiisi vastaamiseen.
                </p>

                <div className="mt-8">
                    <ContactForm/>
                </div>
            </div>

            <footer className="w-full flex flex-col items-center mt-10">
                <nav className="flex flex-row gap-32 mt-2">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg">Jani Österberg</h3>
                        <LinkIcon href="https://instagram.com/jani.osterberg" variant="ig"/>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg">Jens Österberg</h3>
                        <div className="flex gap-8">
                            <LinkIcon href="https://instagram.com/oletusarvo.art" variant="ig"/>
                            <LinkIcon href="https://soundcloud.com/oletusarvo" variant="sc"/>
                        </div>
                    </div>
                </nav>
            </footer>
        </div>
    )
}

export default Footer;