import Spinner from 'kotilogi-app/components/Spinner/Spinner';
import style from './loading.module.scss';

export default async function Loading(){
    return(
        <div className={style.loading}>
            <h1>Ladataan...</h1>
            <Spinner size="3rem"/>
        </div>
    );
}