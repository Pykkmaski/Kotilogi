import Spinner from "../Spinner/Spinner";
import styles from './component.module.scss';

export default function Loading({message}){
    return (
        <div className={styles.container}>
            <Spinner size="3rem"></Spinner>
            <h2 className={styles.message}>{message}</h2>
        </div>
    )
}