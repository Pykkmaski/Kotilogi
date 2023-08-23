import styles from './styles.module.scss';

export default function Spinner({size, message, classNameProp}){
    return (
        <div className={styles.container}>
            <div className={styles.spinner} style={{width: size, height: size}}>

            </div>

            <span className={styles.message}>{message}</span>
        </div>
        
    );
}