import style from './loading.module.scss';

export default function Loading(){
    return(
        <div className={style.loading}>
            <h1>Ladataan...</h1>
        </div>
    );
}