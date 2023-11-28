import Button from 'kotilogi-app/components/Button/Button';
import style from './style.module.scss';

export default async function UsagePage(){
    return (
        <section>
            <div className={style.header}>
                <h1>Kulutus</h1>
            </div>
            
            <div className={style.buttons}>
                <Button
                    className="primary"
                    
                />
            </div>
        </section>
    )
}