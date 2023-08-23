import LoadingSpinner from "kotilogi-app/components/Spinner/Spinner";
import style from './loading.module.scss';

export default function Loading(props){
    return(
        <div className={style.loading}>
            <h1>Ladataan...</h1>
            <LoadingSpinner size="4rem"/>
        </div>
    );
}