import style from './page.module.scss';
import WelcomeText from 'kotilogi-app/components/Pages/Index/WelcomeText/WelcomeText';
import ProfileText from 'kotilogi-app/components/Pages/Index/ProfileText/ProfileText';
import Pricing from 'kotilogi-app/components/Pages/Index/Pricing/Pricing';
import Footer from 'kotilogi-app/components/Pages/Index/Footer/Footer';


export default function Page(props){
    return (
        <main>
            <WelcomeText/>
            <section className={style.description}>
                <div className={style.gradient}/>
                <div className={style.bgImage}/>
                <ProfileText/>
            </section>
            <Pricing/>
           
            <Footer/>
        </main>
    )
}