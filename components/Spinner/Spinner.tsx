import styles from './styles.module.scss';

export type SpinnerProps = {
    size: string,
    message?: string,
    classNameProp?: string,
}

export default function Spinner({size, message, classNameProp} : SpinnerProps){
    return (
        <div className={styles.container}>
            <div className={styles.spinner} style={{width: size, height: size}}>

            </div>

            <span className={styles.message}>{message}</span>
        </div>
        
    );
}