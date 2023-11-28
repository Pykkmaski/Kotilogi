import SideBar from "./SideBar";
import style from './layout.module.scss';

export default function Layout({params, children}){
    return (
        <main className={style.layout}>
            <SideBar/>
            <section className={style.content}>
                {children}
            </section>
        </main>
    );
}