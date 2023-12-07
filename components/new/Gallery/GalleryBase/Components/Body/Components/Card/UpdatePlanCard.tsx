import style from './style.module.scss';

export default function UpdatePlanCard(){
    return (
        <div className={style.updatePlanCard}>
            <p>
                Perus-käyttäjänä voit lisätä ainoastaan yhden talon tiedot.<br/><br/>
                Ota yhteyttä Kotilogiin, mikäli tahdot lisätä enemmän.
            </p>
        </div>
    );
}