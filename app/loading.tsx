import Spinner from 'kotilogi-app/components/Spinner/Spinner';
import style from './loading.module.scss';

export default function Loading(){
    return(
        <div className={style.loading}>
            <Spinner size="2rem"/>
        </div>
    );
}